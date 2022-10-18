import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ICommentsState} from '../types/commentsState.interface'

export const commentsFeatureSelector =
  createFeatureSelector<ICommentsState>('comments')

export const isLoadingSelector = createSelector(
  commentsFeatureSelector,
  (commentsState: ICommentsState) => commentsState.isLoading
)
export const errorSelector = createSelector(
  commentsFeatureSelector,
  (commentsState: ICommentsState) => commentsState.error
)
export const commentsSelector = createSelector(
  commentsFeatureSelector,
  (commentsState: ICommentsState) => commentsState.data
)
