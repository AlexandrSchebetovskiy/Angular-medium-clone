import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FeedComponent} from './components/feed/feed.component'
import {RouterModule, Routes} from '@angular/router'
import {HttpClientModule} from '@angular/common/http'
import {EffectsModule} from '@ngrx/effects'
import {GetFeedEffect} from './store/effects/getFeed.effect'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {FeedService} from './services/feed.service'
import {ErrorMessageModule} from '../errorMessage/errorMessage.module'
import {LoadingModule} from '../loading/loading.module'
import {PaginationModule} from '../pagination/pagination.module'
import {TagListModule} from '../tagList/tagList.module'
import {AddToFavoritesModule} from '../addToFavorites/addToFavorites.module'

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LoadingModule,
    PaginationModule,
    TagListModule,
    RouterModule,
    ErrorMessageModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers),
    AddToFavoritesModule,
  ],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
