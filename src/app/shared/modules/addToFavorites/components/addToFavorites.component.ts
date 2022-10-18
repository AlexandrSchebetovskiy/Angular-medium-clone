import {Component, Input, OnDestroy, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {addToFavorites} from '../store/actions/addToFavorites.action'
import {filter, Subscription} from 'rxjs'
import {isLoggedInSelector} from '../../../../auth/store/selectors'
import {Router} from '@angular/router'

@Component({
  selector: 'app-favorites-button',
  templateUrl: './addToFavorites.component.html',
  styleUrls: ['./addToFavorites.component.scss'],
})
export class AddToFavoritesComponent implements OnInit, OnDestroy {
  @Input('slug') articleSlugProp: string
  @Input('isFavorited') isFavoritedProp: boolean
  @Input('favCount') favCountProp: number
  isLoggedIn: boolean
  favoritesCount: number
  isFavorited: boolean
  private isLoggedInSub: Subscription

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.favoritesCount = this.favCountProp
    this.isFavorited = this.isFavoritedProp
    this.isLoggedInSub = this.store
      .pipe(select(isLoggedInSelector), filter(Boolean))
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn
      })
  }

  handleClick() {
    if (!this.isLoggedIn) {
      return this.router.navigate(['/login'])
    }
    this.store.dispatch(
      addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlugProp,
      })
    )
    if (this.isFavorited) {
      this.favoritesCount--
    } else {
      this.favoritesCount++
    }
    this.isFavorited = !this.isFavorited
    return
  }

  ngOnDestroy(): void {
    this.isLoggedInSub.unsubscribe()
  }
}
