import {IBackendErrors} from '../../../shared/types/backendErrors.interface'

export interface ISettingsState {
  isSubmitting: boolean
  validationErrors: IBackendErrors | null
}
