import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action.types'
import {IFeedResponse} from '../../types/feedResponse.interface'

export const getFeedAction = createAction(
  ActionTypes.GET_FEED,
  props<{url: string}>()
)
export const getFeedSuccessAction = createAction(
  ActionTypes.GET_FEED_SUCCESS,
  props<{feed: IFeedResponse}>()
)
export const getFeedFailureAction = createAction(ActionTypes.GET_FEED_FAILURE)
