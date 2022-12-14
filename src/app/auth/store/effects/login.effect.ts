import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {AuthService} from '../../services/authService'
import {ICurrentUser} from '../../../shared/types/currentUser.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {PersistanceService} from '../../../shared/services/persistance.service'
import {Router} from '@angular/router'
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.action'

@Injectable()
export class LoginEffect {
  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: ICurrentUser) => {
            this.persistanceService.set('accessToken', currentUser.token)
            return loginSuccessAction({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFailureAction({errors: errorResponse.error.errors}))
          })
        )
      })
    )
  })

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigate(['/'])
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
