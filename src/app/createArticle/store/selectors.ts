import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ICreateArticleState} from './types/createArticleState.interface'

export const createArticleFeatureSelector =
  createFeatureSelector<ICreateArticleState>('createArticle')

export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: ICreateArticleState) => createArticleState.isSubmitting
)
export const validationErrorsSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: ICreateArticleState) =>
    createArticleState.validationErrors
)
