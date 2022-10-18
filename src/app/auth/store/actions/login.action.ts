import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action.types'
import {ILoginRequest} from '../../types/loginRequest.interface'
import {ICurrentUser} from '../../../shared/types/currentUser.interface'
import {IBackendErrors} from '../../../shared/types/backendErrors.interface'

class LoginRequestInterface {}

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{request: ILoginRequest}>()
)

class CurrentUserInterface {}

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{currentUser: ICurrentUser}>()
)

class BackendErrorsInterface {}

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{errors: IBackendErrors}>()
)
