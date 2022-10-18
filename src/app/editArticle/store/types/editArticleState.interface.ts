import {IBackendErrors} from '../../../shared/types/backendErrors.interface'
import {IArticle} from '../../../shared/types/article.interface'

export interface IEditArticleState {
  isSubmitting: boolean
  validationErrors: IBackendErrors | null
  isLoading: boolean
  article: IArticle | null
}
