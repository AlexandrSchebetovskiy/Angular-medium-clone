import {IAuthState} from '../types/authState.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './actions/register.action'
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from './actions/login.action'

import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from './actions/getCurrentUser.action'
import {updateCurrentUserSuccessAction} from './actions/updateCurrentUser.action'
import {logoutAction} from './actions/sync.action'
import {state} from '@angular/animations'

const initialState: IAuthState = {
  isLoggedIn: null,
  validatorErrors: null,
  isSubmitting: false,
  currentUser: null,
  isLoading: false,
}

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
      validatorErrors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    registerFailureAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      validatorErrors: action.errors,
    })
  ),
  on(
    loginAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
      validatorErrors: null,
    })
  ),
  on(loginSuccessAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
  })),
  on(
    loginFailureAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      validatorErrors: action.errors,
    })
  ),
  on(getCurrentUserAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getCurrentUserSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
  })),
  on(getCurrentUserFailureAction, (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    currentUser: null,
  })),
  on(updateCurrentUserSuccessAction, (state, action) => ({
    ...state,
    currentUser: action.currentUser,
  })),
  on(logoutAction, () => ({
    ...initialState,
    isLoggedIn: false,
  }))
)

export function reducer(state: IAuthState, action: Action) {
  return authReducer(state, action)
}
