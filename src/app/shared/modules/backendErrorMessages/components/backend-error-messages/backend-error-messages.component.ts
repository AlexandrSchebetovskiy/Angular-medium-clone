import {Component, Input, OnInit} from '@angular/core'
import {IBackendErrors} from '../../../../types/backendErrors.interface'

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input() backendErrors: IBackendErrors
  errorMessages: string[]

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((key) => {
      return key + ' ' + this.backendErrors[key].join(', ')
    })
  }
}
