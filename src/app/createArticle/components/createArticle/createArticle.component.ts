import {Component, OnInit} from '@angular/core'
import {IArticleInput} from '../../../shared/types/articleInput.interface'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {IBackendErrors} from '../../../shared/types/backendErrors.interface'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import {createArticleAction} from '../../store/actions/createArticle.action'

@Component({
  selector: 'app-create-article',
  templateUrl: './createArticle.component.html',
})
export class CreateArticleComponent implements OnInit {
  initialValues: IArticleInput = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<IBackendErrors | null>
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }
  onSubmit(article: IArticleInput) {
    this.store.dispatch(createArticleAction({article}))
  }
}
