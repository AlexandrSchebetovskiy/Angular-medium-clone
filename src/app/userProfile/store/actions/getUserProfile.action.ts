import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../actionTypes'
import {IProfile} from '../../../shared/types/profile.interface'

export const getUserProfileAction = createAction(
  ActionTypes.GET_USER_PROFILE,
  props<{slug: string}>()
)
export const getUserProfileSuccessAction = createAction(
  ActionTypes.GET_USER_PROFILE_SUCCESS,
  props<{profile: IProfile}>()
)
export const getUserProfileFailureAction = createAction(
  ActionTypes.GET_USER_PROFILE_FAILURE
)
