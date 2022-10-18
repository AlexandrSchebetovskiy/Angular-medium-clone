import {Component, Input, OnDestroy, OnInit} from '@angular/core'
import {filter, Subscription} from 'rxjs'
import {select, Store} from '@ngrx/store'
import {isLoggedInSelector} from '../../../../auth/store/selectors'
import {followProfile} from '../store/actions/addToFavorites.action'
import {Router} from '@angular/router'

@Component({
  selector: 'app-follow-button',
  templateUrl: './followProfile.component.html',
  styleUrls: ['./followProfile.component.scss'],
})
export class FollowProfileComponent implements OnInit, OnDestroy {
  @Input('isFollowed') isFollowedProp: boolean
  @Input('slug') slugProp: string

  slug: string
  isFollowed: boolean
  isLoggedIn: boolean
  isLoggedInSub: Subscription

  constructor(private store: Store, private router: Router) {}
  ngOnInit(): void {
    this.slug = this.slugProp
    this.isFollowed = this.isFollowedProp
    this.isLoggedInSub = this.store
      .pipe(select(isLoggedInSelector), filter(Boolean))
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn
      })
  }

  ngOnDestroy(): void {
    this.isLoggedInSub.unsubscribe()
  }

  handleClick() {
    if (!this.isLoggedIn) {
      return this.router.navigate(['/login'])
    }
    this.store.dispatch(
      followProfile({
        isFollowed: this.isFollowed,
        slug: this.slug,
      })
    )
    this.isFollowed = !this.isFollowed
    return
  }
}
