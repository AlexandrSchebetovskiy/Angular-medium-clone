import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-errorMessage',
  template: ` <div>{{ message }}</div> `,
})
export class ErrorMessageComponent implements OnInit {
  @Input('errorMessage') message: string = 'Something went wrong'
  constructor() {}

  ngOnInit() {}
}
