import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action.types'
import {ILoginRequest} from '../../types/loginRequest.interface'
import {ICurrentUser} from '../../../shared/types/currentUser.interface'

export const getCurrentUserAction = createAction(ActionTypes.GET_CURRENT_USER)
export const getCurrentUserSuccessAction = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{currentUser: ICurrentUser}>()
)
export const getCurrentUserFailureAction = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE
)
