import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action.types'
import {IRegisterRequest} from '../../types/registerRequest.interface'
import {ICurrentUser} from '../../../shared/types/currentUser.interface'
import {IBackendErrors} from '../../../shared/types/backendErrors.interface'

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{request: IRegisterRequest}>()
)
export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{currentUser: ICurrentUser}>()
)
export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{errors: IBackendErrors}>()
)
