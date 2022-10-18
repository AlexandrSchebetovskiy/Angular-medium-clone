import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../actionTypes'

export const removeCommentAction = createAction(
  ActionTypes.REMOVE_COMMENT,
  props<{slug: string; id: number}>()
)
export const removeCommentSuccessAction = createAction(
  ActionTypes.REMOVE_COMMENT_SUCCESS
)
export const removeCommentFailureAction = createAction(
  ActionTypes.REMOVE_COMMENT_FAILURE
)
