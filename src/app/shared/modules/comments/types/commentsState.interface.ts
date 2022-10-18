import {IComment} from './comment.interface'

export interface ICommentsState {
  isLoading: boolean
  error: string | null
  data: IComment[] | null
}
