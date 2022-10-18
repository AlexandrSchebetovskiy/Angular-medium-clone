import {IUserProfileState} from '../types/userProfileState.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {
  getUserProfileAction,
  getUserProfileSuccessAction,
} from './actions/getUserProfile.action'
import {routerNavigationAction} from '@ngrx/router-store'
import {IFeedState} from '../../shared/modules/feed/types/feedState.interface'

const initialState: IUserProfileState = {
  isLoading: false,
  data: null,
  error: null,
}
const userProfileReducer = createReducer(
  initialState,
  on(getUserProfileAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getUserProfileSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.profile,
  })),
  on(getUserProfileSuccessAction, (state) => ({
    ...state,
    isLoading: false,
    error: 'Something went wrong',
  })),
  on(routerNavigationAction, (): IUserProfileState => initialState)
)

export function reducers(state: IUserProfileState, action: Action) {
  return userProfileReducer(state, action)
}
