import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ICommentRequest} from '../../types/commentRequest.interface'

@Component({
  selector: 'app-add-comment',
  templateUrl: './addComment.component.html',
})
export class AddCommentComponent implements OnInit {
  @Input('slug') slugProp: string
  @Output() onSubmit = new EventEmitter<ICommentRequest>()
  form: FormGroup

  ngOnInit(): void {
    this.initializeForm()
  }

  submit() {
    if (this.form.invalid) return
    const comment: ICommentRequest = {
      ...this.form.value,
    }
    this.onSubmit.emit(comment)
    this.form.reset()
  }

  private initializeForm() {
    this.form = new FormGroup({
      body: new FormControl('', Validators.required),
    })
  }
}
