import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {registerAction} from '../../store/actions/register.action'
import {Observable} from 'rxjs'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import {AuthService} from '../../services/authService'
import {IRegisterRequest} from '../../types/registerRequest.interface'
import {IBackendErrors} from '../../../shared/types/backendErrors.interface'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<IBackendErrors | null>

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeFrom()
    this.initializeValues()
  }

  onSubmit(): void {
    const request: IRegisterRequest = {user: this.form.value}
    this.store.dispatch(registerAction({request}))
  }

  private initializeFrom(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
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
