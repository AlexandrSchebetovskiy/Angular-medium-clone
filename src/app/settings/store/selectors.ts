import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ISettingsState} from './types/settingsState.interface'

export const settingsFeatureSelector =
  createFeatureSelector<ISettingsState>('auth')

export const isSubmittingSelector = createSelector(
  settingsFeatureSelector,
  (settingState: ISettingsState) => settingState.isSubmitting
)
export const validationErrorsSelector = createSelector(
  settingsFeatureSelector,
  (settingState: ISettingsState) => settingState.validationErrors
)
