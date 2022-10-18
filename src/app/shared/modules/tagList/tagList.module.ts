import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TagListComponent} from './components/tagList/tagList.component'
import {RouterModule} from '@angular/router'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TagListComponent],
  exports: [TagListComponent],
})
export class TagListModule {}
