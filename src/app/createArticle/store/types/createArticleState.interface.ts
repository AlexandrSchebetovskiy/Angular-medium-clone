import {IBackendErrors} from '../../../shared/types/backendErrors.interface'

export interface ICreateArticleState {
  isSubmitting: boolean
  validationErrors: IBackendErrors | null
}
