import {ITagResponse} from './tagResponse.interface'
import {PopularTagType} from '../../../types/popularTag.type'

export interface ITagState {
  isLoading: boolean
  error: string | null
  data: PopularTagType[] | null
}
