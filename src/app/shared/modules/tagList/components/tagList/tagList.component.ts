import {Component, Input} from '@angular/core'
import {PopularTagType} from '../../../../types/popularTag.type'

@Component({
  selector: 'app-tag-list',
  templateUrl: './tagList.component.html',
  styleUrls: ['./tagList.component.scss'],
})
export class TagListComponent {
  @Input('tags') tagList: PopularTagType[]
}
