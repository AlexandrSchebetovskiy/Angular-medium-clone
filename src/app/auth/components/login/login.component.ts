import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Observable} from 'rxjs'
import {IBackendErrors} from '../../../shared/types/backendErrors.interface'
import {select, Store} from '@ngrx/store'
import {AuthService} from '../../services/authService'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import {ILoginRequest} from '../../types/loginRequest.interface'
import {loginAction} from '../../store/actions/login.action'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<IBackendErrors | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeFrom()
    this.initializeValues()
  }

  onSubmit(): void {
    const request: ILoginRequest = {user: this.form.value}
    this.store.dispatch(loginAction({request}))
  }

  private initializeFrom(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    })
  }

  private initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }
}
