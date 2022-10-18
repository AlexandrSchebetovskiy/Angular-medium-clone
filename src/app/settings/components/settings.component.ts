import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {ICurrentUser} from '../../shared/types/currentUser.interface'
import {filter, Observable, Subscription} from 'rxjs'
import {currentUserSelector} from '../../auth/store/selectors'
import {IBackendErrors} from '../../shared/types/backendErrors.interface'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../store/selectors'
import {updateCurrentUserAction} from '../../auth/store/actions/updateCurrentUser.action'
import {ICurrentUserInput} from '../../shared/types/currentUserInput.interface'
import {logoutAction} from '../../auth/store/actions/sync.action'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  isSubmitting$: Observable<boolean>
  validationErrors$: Observable<IBackendErrors | null>
  currentUser: ICurrentUser
  currentUserSub: Subscription
  form: FormGroup

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeListeners()
    this.initializeValues()
  }

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe()
  }

  private initializeListeners() {
    this.currentUserSub = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: ICurrentUser) => {
        this.currentUser = currentUser
        this.initializeForm()
      })
  }
  private initializeForm() {
    this.form = new FormGroup({
      image: new FormControl(this.currentUser.image),
      username: new FormControl(this.currentUser.username, Validators.required),
      bio: new FormControl(this.currentUser.bio),
      email: new FormControl(this.currentUser.email, Validators.required),
      password: new FormControl(''),
    })
  }

  private initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.validationErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  onSubmit() {
    if (this.form.invalid) return
    const currentUserInput: ICurrentUserInput = {
      ...this.currentUser,
      ...this.form.value,
    }
    this.store.dispatch(updateCurrentUserAction({currentUserInput}))
  }
  logout() {
    this.store.dispatch(logoutAction())
  }
}
