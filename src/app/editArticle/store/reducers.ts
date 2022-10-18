import {IEditArticleState} from './types/editArticleState.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {
  editArticleAction,
  editArticleFailureAction,
  editArticleSuccessAction,
} from './actions/editArticle.action'
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from './actions/getArticle.action'

const initialState: IEditArticleState = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
}

const editArticleReducer = createReducer(
  initialState,
  on(editArticleAction, (state) => ({
    ...state,
    isSubmitting: true,
  })),
  on(editArticleSuccessAction, (state) => ({
    ...state,
    isSubmitting: false,
  })),
  on(editArticleFailureAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
  })),
  on(getArticleAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getArticleSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    article: action.article,
  })),
  on(getArticleFailureAction, (state) => ({
    ...state,
    isLoading: false,
  }))
)

export function reducers(state: IEditArticleState, action: Action) {
  return editArticleReducer(state, action)
}
