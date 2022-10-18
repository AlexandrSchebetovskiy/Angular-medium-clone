import {Component, Input, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {select, Store} from '@ngrx/store'
import {isLoggedInSelector} from '../../../../../auth/store/selectors'
import {Router} from '@angular/router'

@Component({
  selector: 'app-feed-toggler',
  templateUrl: './feedToggler.component.html',
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagName: string | null
  isLoggedIn$: Observable<boolean | null>

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.initializeValues()
    console.log(this.tagName)
  }

  private initializeValues() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
  }
}
