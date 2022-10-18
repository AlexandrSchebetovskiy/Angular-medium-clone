import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action.types'
import {IArticle} from '../../../shared/types/article.interface'

export const removeArticleAction = createAction(
  ActionTypes.REMOVE_ARTICLE,
  props<{slug: string}>()
)
export const removeArticleSuccessAction = createAction(
  ActionTypes.REMOVE_ARTICLE_SUCCESS
)
export const removeArticleFailureAction = createAction(
  ActionTypes.REMOVE_ARTICLE_FAILURE
)
