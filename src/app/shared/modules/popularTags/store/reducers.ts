import {ITagState} from '../types/tagState.interaface'
import {Action, createReducer, on} from '@ngrx/store'
import {
  getTagAction,
  getTagFailureAction,
  getTagSuccessAction,
} from './actions/getTags.action'
import {state} from '@angular/animations'
import {IFeedState} from '../../feed/types/feedState.interface'

const initialState: ITagState = {
  data: null,
  isLoading: false,
  error: null,
}

const tagsReducer = createReducer(
  initialState,
  on(getTagAction, (state) => ({
    ...state,
    data: null,
    isLoading: true,
  })),
  on(getTagSuccessAction, (state, action) => ({
    ...state,
    data: action.tags,
    isLoading: false,
  })),
  on(getTagFailureAction, (state) => ({
    ...state,
    isLoading: false,
    error: 'Something went wrong',
  }))
)

export function reducers(state: ITagState, action: Action) {
  return tagsReducer(state, action)
}
