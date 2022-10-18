import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../actionTypes'
import {IComment} from '../../types/comment.interface'

export const getCommentsActions = createAction(
  ActionTypes.GET_COMMENTS,
  props<{slug: string}>()
)
export const getCommentsSuccessActions = createAction(
  ActionTypes.GET_COMMENTS_SUCCESS,
  props<{comments: IComment[]}>()
)
export const getCommentsFailureActions = createAction(
  ActionTypes.GET_COMMENTS_FAILURE
)
