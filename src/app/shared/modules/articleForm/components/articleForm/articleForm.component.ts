import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {IArticleInput} from '../../../../types/articleInput.interface'
import {IBackendErrors} from '../../../../types/backendErrors.interface'
import {FormControl, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-article-form',
  templateUrl: './articleForm.component.html',
  styleUrls: ['./articleForm.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues: IArticleInput
  @Input('isSubmitting') isSubmitting: boolean
  @Input() errors: IBackendErrors | null
  @Output('articleSubmit') articleSubmitEvent =
    new EventEmitter<IArticleInput>()

  form: FormGroup

  ngOnInit(): void {
    this.initializeForm()
  }

  onSubmit() {
    if (this.form.invalid) return
    const tagList = this.form.value['tagList'].trim().split(' ')
    const article = {
      ...this.form.value,
      tagList,
    }
    this.articleSubmitEvent.emit(article)
  }
  private initializeForm() {
    console.log(this.initialValues)
    this.form = new FormGroup({
      title: new FormControl(this.initialValues.title),
      description: new FormControl(this.initialValues.description),
      body: new FormControl(this.initialValues.body),
      tagList: new FormControl(this.initialValues.tagList.join(' ')),
    })
  }
}
