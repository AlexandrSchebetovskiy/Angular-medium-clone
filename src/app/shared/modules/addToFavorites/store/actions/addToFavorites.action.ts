import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../actionTypes'
import {IArticle} from '../../../../types/article.interface'

export const addToFavorites = createAction(
  ActionTypes.ADD_TO_FAVORITES,
  props<{isFavorited: boolean; slug: string}>()
)
export const addToFavoritesSuccess = createAction(
  ActionTypes.ADD_TO_FAVORITES_SUCCESS,
  props<{article: IArticle}>()
)
export const addToFavoritesFailure = createAction(
  ActionTypes.ADD_TO_FAVORITES_FAILURE
)
