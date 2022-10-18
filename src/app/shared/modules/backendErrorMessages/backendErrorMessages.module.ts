import {NgModule} from '@angular/core'
import {BackendErrorMessagesComponent} from './components/backend-error-messages/backend-error-messages.component'
import {CommonModule} from '@angular/common'

@NgModule({
  imports: [CommonModule],
  declarations: [BackendErrorMessagesComponent],
  exports: [BackendErrorMessagesComponent],
})
export class BackendErrorMessagesModule {}
