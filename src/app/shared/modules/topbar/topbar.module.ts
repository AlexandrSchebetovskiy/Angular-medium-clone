import {NgModule} from '@angular/core'
import {TopbarComponent} from './components/topbar/topbar.component'
import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http'
import {RouterModule} from '@angular/router'

@NgModule({
  declarations: [TopbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [TopbarComponent],
})
export class TopbarModule {}
