import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ArticleComponent} from './components/feed/article.component'
import {RouterModule, Routes} from '@angular/router'
import {HttpClientModule} from '@angular/common/http'
import {EffectsModule} from '@ngrx/effects'
import {GetArticleEffect} from './store/effects/getArticle.effect'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {ArticleService} from '../shared/services/article.service'
import {ErrorMessageModule} from '../shared/modules/errorMessage/errorMessage.module'
import {LoadingModule} from '../shared/modules/loading/loading.module'
import {TagListModule} from '../shared/modules/tagList/tagList.module'
import {RemoveArticleEffect} from './store/effects/removeArticle.effect'
import {MarkdownModule, MarkdownService} from 'ngx-markdown'
import {CommentsModule} from '../shared/modules/comments/comments.module'
import {FollowProfileModule} from '../shared/modules/followProfile/followProfile.module'
import {AddToFavoritesModule} from '../shared/modules/addToFavorites/addToFavorites.module'

const routes: Routes = [{path: 'articles/:slug', component: ArticleComponent}]
@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LoadingModule,
    RouterModule.forChild(routes),
    ErrorMessageModule,
    EffectsModule.forFeature([GetArticleEffect, RemoveArticleEffect]),
    StoreModule.forFeature('article', reducers),
    TagListModule,
    MarkdownModule.forChild(),
    CommentsModule,
    FollowProfileModule,
    AddToFavoritesModule,
  ],

  providers: [ArticleService],
  exports: [ArticleComponent],
})
export class ArticleModule {}
