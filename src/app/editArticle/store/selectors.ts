import {createFeatureSelector, createSelector} from '@ngrx/store'
import {IEditArticleState} from './types/editArticleState.interface'

export const editArticleFeatureSelector =
  createFeatureSelector<IEditArticleState>('editArticle')

export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: IEditArticleState) => editArticleState.isSubmitting
)
export const validationErrorsSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: IEditArticleState) => editArticleState.validationErrors
)
export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: IEditArticleState) => editArticleState.isLoading
)
export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: IEditArticleState) => editArticleState.article
)
