import {IFeedState} from '../types/feedState.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from './action/getFeed.action'
import {state} from '@angular/animations'
import {routerNavigationAction} from '@ngrx/router-store'
import {IFeedResponse} from '../types/feedResponse.interface'

const initialState: IFeedState = {
  data: null,
  error: null,
  isLoading: false,
}

const feedReducer = createReducer(
  initialState,
  on(getFeedAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getFeedSuccessAction, (state, action) => ({
    ...state,
    data: action.feed,
    isLoading: false,
  })),
  on(getFeedFailureAction, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(routerNavigationAction, (): IFeedState => initialState)
)

export function reducers(state: IFeedState, action: Action) {
  return feedReducer(state, action)
}
