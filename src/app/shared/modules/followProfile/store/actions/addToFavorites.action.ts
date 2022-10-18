import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../actionTypes'
import {IProfile} from '../../../../types/profile.interface'

export const followProfile = createAction(
  ActionTypes.FOLLOW_PROFILE,
  props<{isFollowed: boolean; slug: string}>()
)
export const followProfileSuccess = createAction(
  ActionTypes.FOLLOW_PROFILE_SUCCESS,
  props<{profile: IProfile}>()
)
export const followProfileFailure = createAction(
  ActionTypes.FOLLOW_PROFILE_FAILURE
)
