import {IArticleState} from '../types/articleState.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from './action/getArticle.action'
import {routerNavigationAction} from '@ngrx/router-store'

const initialState: IArticleState = {
  data: null,
  error: null,
  isLoading: false,
}

const articleReducer = createReducer(
  initialState,
  on(getArticleAction, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(getArticleSuccessAction, (state, action) => ({
    ...state,
    data: action.article,
    isLoading: false,
  })),

  on(getArticleFailureAction, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(routerNavigationAction, (): IArticleState => initialState)
)

export function reducers(state: IArticleState, action: Action) {
  return articleReducer(state, action)
}
