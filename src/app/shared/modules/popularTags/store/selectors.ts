import {createFeatureSelector, createSelector} from '@ngrx/store'

import {ITagState} from '../types/tagState.interaface'

export const tagsFeatureSelector = createFeatureSelector<ITagState>('tags')

export const isLoadingSelector = createSelector(
  tagsFeatureSelector,
  (tagsState: ITagState) => tagsState.isLoading
)
export const errorSelector = createSelector(
  tagsFeatureSelector,
  (tagsState: ITagState) => tagsState.error
)
export const tagsSelector = createSelector(
  tagsFeatureSelector,
  (tagsState: ITagState) => tagsState.data
)
