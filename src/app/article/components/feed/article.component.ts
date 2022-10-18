import {Component, OnDestroy, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {getArticleAction} from '../../store/action/getArticle.action'
import {ActivatedRoute} from '@angular/router'
import {combineLatest, map, Observable, Subscription} from 'rxjs'
import {IArticle} from '../../../shared/types/article.interface'
import {
  articleSelector,
  errorSelector,
  isLoadingSelector,
} from '../../store/selectors'
import {currentUserSelector} from '../../../auth/store/selectors'
import {ICurrentUser} from '../../../shared/types/currentUser.interface'
import {removeArticleAction} from '../../store/action/removeArticle.action'

@Component({
  selector: 'app-feed',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  articleSub: Subscription
  article: IArticle | null
  isAuthor$: Observable<boolean>
  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.fetchData()
  }

  ngOnDestroy(): void {
    if (this.articleSub) this.articleSub.unsubscribe()
  }

  removeArticle() {
    this.store.dispatch(removeArticleAction({slug: this.slug}))
  }

  private initializeValues() {
    this.slug = this.route.snapshot.paramMap.get('slug')!
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector)),
    ]).pipe(
      map(([article, currentUser]: [IArticle | null, ICurrentUser | null]) => {
        if (!article || !currentUser) return false
        return article.author.username === currentUser.username
      })
    )
  }

  private fetchData() {
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }

  private initializeListeners() {
    this.articleSub = this.store
      .pipe(select(articleSelector))
      .subscribe((article: IArticle | null) => {
        this.article = article
      })
  }
}
