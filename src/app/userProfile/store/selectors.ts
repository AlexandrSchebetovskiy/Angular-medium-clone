import {createFeatureSelector, createSelector} from '@ngrx/store'
import {IUserProfileState} from '../types/userProfileState.interface'

export const userProfileFeatureSelector =
  createFeatureSelector<IUserProfileState>('userProfile')

export const isLoadingSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: IUserProfileState) => userProfileState.isLoading
)
export const errorSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: IUserProfileState) => userProfileState.error
)
export const userProfileSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: IUserProfileState) => userProfileState.data
)
