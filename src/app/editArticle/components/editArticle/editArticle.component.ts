import {Component, OnInit} from '@angular/core'
import {IArticleInput} from '../../../shared/types/articleInput.interface'
import {select, Store} from '@ngrx/store'
import {filter, map, Observable, of} from 'rxjs'
import {IBackendErrors} from '../../../shared/types/backendErrors.interface'

import {editArticleAction} from '../../store/actions/editArticle.action'
import {ActivatedRoute} from '@angular/router'
import {
  articleSelector,
  validationErrorsSelector,
  isLoadingSelector,
  isSubmittingSelector,
} from 'src/app/editArticle/store/selectors'
import {IArticle} from '../../../shared/types/article.interface'
import {getArticleAction} from '../../store/actions/getArticle.action'

@Component({
  selector: 'app-edit-article',
  templateUrl: './editArticle.component.html',
})
export class EditArticleComponent implements OnInit {
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<IBackendErrors | null>
  isLoading$: Observable<boolean>
  initialValues$: Observable<IArticleInput>
  slug: string
  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }
  onSubmit(article: IArticleInput) {
    this.store.dispatch(editArticleAction({article, slug: this.slug}))
  }

  private initializeValues() {
    this.slug = this.route.snapshot.paramMap.get('slug')!
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: IArticle) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        }
      })
    )
  }

  private fetchData() {
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }
}
