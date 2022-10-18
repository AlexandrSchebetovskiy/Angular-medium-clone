import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action.types'
import {ITagResponse} from '../../types/tagResponse.interface'
import {PopularTagType} from '../../../../types/popularTag.type'

export const getTagAction = createAction(ActionTypes.GET_TAGS)
export const getTagSuccessAction = createAction(
  ActionTypes.GET_TAGS_SUCCESS,
  props<{tags: PopularTagType[]}>()
)
export const getTagFailureAction = createAction(ActionTypes.GET_TAGS_FAILURE)
