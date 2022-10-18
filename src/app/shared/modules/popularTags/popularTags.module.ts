import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PopularTagsComponent} from './components/popularTags/popularTags.component'
import {PopularTagsService} from './services/popularTags.service'
import {HttpClientModule} from '@angular/common/http'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {GetTagsEffect} from './store/effects/getTags.effect'
import {ErrorMessageModule} from '../errorMessage/errorMessage.module'
import {LoadingModule} from '../loading/loading.module'
import {RouterModule} from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ErrorMessageModule,
    LoadingModule,
    RouterModule,
    EffectsModule.forFeature([GetTagsEffect]),
    StoreModule.forFeature('tags', reducers),
  ],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService],
})
export class PopularTagsModule {}
