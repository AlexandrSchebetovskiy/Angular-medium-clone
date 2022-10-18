import {IFeedResponse} from './feedResponse.interface'

export interface IFeedState {
  isLoading: boolean
  error: string | null
  data: IFeedResponse | null
}
