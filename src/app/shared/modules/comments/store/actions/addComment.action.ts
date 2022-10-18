import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../actionTypes'
import {IComment} from '../../types/comment.interface'
import {ICommentRequest} from '../../types/commentRequest.interface'

export const addCommentAction = createAction(
  ActionTypes.ADD_COMMENT,
  props<{slug: string; comment: ICommentRequest}>()
)
export const addCommentSuccessAction = createAction(
  ActionTypes.ADD_COMMENT_SUCCESS,
  props<{comment: IComment}>()
)
export const addCommentFailureAction = createAction(
  ActionTypes.ADD_COMMENT_FAILURE
)
