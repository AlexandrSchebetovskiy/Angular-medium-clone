import {Action, createReducer, on} from '@ngrx/store'
import {ISettingsState} from './types/settingsState.interface'
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from '../../auth/store/actions/updateCurrentUser.action'
import {state} from '@angular/animations'

const initialState: ISettingsState = {
  isSubmitting: false,
  validationErrors: null,
}
const settingsReducer = createReducer(
  initialState,
  on(updateCurrentUserAction, (state) => ({
    ...state,
    isSubmitting: true,
  })),
  on(updateCurrentUserSuccessAction, (state) => ({
    ...state,
    isSubmitting: false,
  })),
  on(updateCurrentUserFailureAction, (state, action) => ({
    ...state,
    validationErrors: action.errors,
    isSubmitting: false,
  }))
)

export function reducers(state: ISettingsState, action: Action) {
  return settingsReducer(state, action)
}
