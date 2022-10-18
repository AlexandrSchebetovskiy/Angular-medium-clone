import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {YourFeedComponent} from './components/your-feed/your-feed.component'
import {RouterModule, Routes} from '@angular/router'
import {FeedModule} from '../shared/modules/feed/feed.module'
import {BannerModule} from '../shared/modules/banner/banner.module'
import {PopularTagsModule} from '../shared/modules/popularTags/popularTags.module'
import {FeedTogglerModule} from '../shared/modules/feedToggler/feedToggler.module'

const routes: Routes = [{path: 'feed', component: YourFeedComponent}]
@NgModule({
  declarations: [YourFeedComponent],
  imports: [
    CommonModule,
    BannerModule,
    FeedModule,
    PopularTagsModule,
    RouterModule.forChild(routes),
    FeedTogglerModule,
  ],
})
export class YourFeedModule {}
