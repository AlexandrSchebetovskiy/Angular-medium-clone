import {Component, OnDestroy, OnInit} from '@angular/core'
import {IProfile} from '../../shared/types/profile.interface'
import {combineLatest, filter, map, Observable, Subscription} from 'rxjs'
import {select, Store} from '@ngrx/store'
import {getUserProfileAction} from '../store/actions/getUserProfile.action'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {
  errorSelector,
  isLoadingSelector,
  userProfileSelector,
} from '../store/selectors'
import {currentUserSelector} from '../../auth/store/selectors'
import {ICurrentUser} from '../../shared/types/currentUser.interface'

@Component({
  selector: 'app-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: IProfile
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  userProfileSub: Subscription
  isOwner$: Observable<boolean>
  apiUrl: string
  slug: string

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    // this.fetchData()
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    this.userProfileSub.unsubscribe()
  }

  private initializeValues() {
    this.slug = this.route.snapshot.paramMap.get('slug')!
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))

    this.isOwner$ = combineLatest([
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean)),
    ]).pipe(
      map(([currentUser, userProfile]: [ICurrentUser, IProfile]) => {
        return currentUser.username === userProfile.username
      })
    )
  }

  private initializeListeners() {
    this.userProfileSub = this.store
      .pipe(select(userProfileSelector), filter(Boolean))
      .subscribe((profile) => {
        const isFavorites = this.router.url.includes('/favorites')
        this.userProfile = profile
        this.apiUrl = isFavorites
          ? `/articles?favorited=${this.slug}`
          : `/articles?author=${profile.username}`
      })
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug']
      this.fetchData()
    })
  }

  private fetchData() {
    this.store.dispatch(getUserProfileAction({slug: this.slug}))
  }
}
