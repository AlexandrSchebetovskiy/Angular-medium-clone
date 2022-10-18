import {Action, createReducer, on} from '@ngrx/store'
import {ICommentsState} from '../types/commentsState.interface'
import {
  getCommentsActions,
  getCommentsFailureActions,
  getCommentsSuccessActions,
} from './actions/getComments.actions'
import {routerNavigationAction} from '@ngrx/router-store'
import {
  addCommentAction,
  addCommentFailureAction,
  addCommentSuccessAction,
} from './actions/addComment.action'
import {removeCommentSuccessAction} from './actions/removeComment.action'
import {IComment} from '../types/comment.interface'

const initialState: ICommentsState = {
  data: null,
  error: null,
  isLoading: false,
}
export const commentsReducer = createReducer(
  initialState,
  on(getCommentsActions, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getCommentsSuccessActions, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.comments,
  })),
  on(getCommentsFailureActions, (state) => ({
    ...state,
    isLoading: false,
    error: 'Something went wrong',
  })),
  on(addCommentAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(addCommentSuccessAction, (state, action) => {
    let newData
    if (state.data) {
      newData = [action.comment, ...state.data]
    } else {
      newData = [action.comment]
    }
    return {
      ...state,
      data: newData,
    }
  }),
  on(addCommentFailureAction, (state) => ({
    ...state,
    isLoading: false,
    error: 'Something went wrong',
  })),
  on(removeCommentSuccessAction, (state, action) => {
    const newData = state.data
      ? state.data.filter((c) => c.id !== action.id)
      : null

    return {
      ...state,
      data: newData,
    }
  }),
  on(routerNavigationAction, (): ICommentsState => initialState)
)

export function reducers(state: ICommentsState, action: Action) {
  return commentsReducer(state, action)
}
