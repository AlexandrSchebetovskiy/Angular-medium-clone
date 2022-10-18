import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {getFeedAction} from '../../store/action/getFeed.action'
import {Observable, Subscription} from 'rxjs'
import {IFeedResponse} from '../../types/feedResponse.interface'
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from '../../store/selectors'
import {environment} from '../../../../../../environments/environment'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {parseUrl, stringify} from 'query-string'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input() apiUrl: string

  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  feed$: Observable<IFeedResponse | null>
  limit = environment.limit
  baseUrl: string
  queryParamsSub: Subscription
  currentPage: number
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    console.log('feed init')
  }
  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes.apiUrl.firstChange &&
      changes.apiUrl.currentValue !== changes.apiUrl.previousValue
    if (isApiUrlChanged) {
      this.fetchFeed()
    }
  }
  ngOnDestroy() {
    this.queryParamsSub.unsubscribe()
  }

  private fetchFeed() {
    const offset = environment.limit * this.currentPage - this.limit
    const parsedUrl = parseUrl(this.apiUrl)
    const stringifiedParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    })
    const apiUrlWithParams = parsedUrl.url + '?' + stringifiedParams
    this.store.dispatch(
      getFeedAction({
        url: apiUrlWithParams,
      })
    )
  }

  private initializeValues() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.feed$ = this.store.pipe(select(feedSelector))
    this.baseUrl = this.router.url.split('?')[0]
  }

  private initializeListeners() {
    this.queryParamsSub = this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || 1)
      this.fetchFeed()
    })
  }
}
