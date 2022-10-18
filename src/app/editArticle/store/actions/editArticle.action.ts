import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action.types'
import {IArticleInput} from '../../../shared/types/articleInput.interface'
import {IArticle} from '../../../shared/types/article.interface'
import {IBackendErrors} from '../../../shared/types/backendErrors.interface'

export const editArticleAction = createAction(
  ActionTypes.UPDATE_ARTICLE,
  props<{article: IArticleInput; slug: string}>()
)

export const editArticleSuccessAction = createAction(
  ActionTypes.UPDATE_ARTICLE_SUCCESS,
  props<{article: IArticle}>()
)

export const editArticleFailureAction = createAction(
  ActionTypes.UPDATE_ARTICLE_FAILURE,
  props<{errors: IBackendErrors}>()
)
