import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TagFeedComponent} from './components/tag-feed/tag-feed.component'
import {RouterModule, Routes} from '@angular/router'
import {FeedModule} from '../shared/modules/feed/feed.module'
import {BannerModule} from '../shared/modules/banner/banner.module'
import {PopularTagsModule} from '../shared/modules/popularTags/popularTags.module'
import {FeedTogglerModule} from '../shared/modules/feedToggler/feedToggler.module'

const routes: Routes = [{path: 'tags/:slug', component: TagFeedComponent}]
@NgModule({
  declarations: [TagFeedComponent],
  imports: [
    CommonModule,
    BannerModule,
    FeedModule,
    PopularTagsModule,
    RouterModule.forChild(routes),
    FeedTogglerModule,
  ],
})
export class TagFeedModule {}
