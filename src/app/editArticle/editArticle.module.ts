import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EditArticleComponent} from './components/editArticle/editArticle.component'
import {RouterModule, Routes} from '@angular/router'
import {ArticleFormModule} from '../shared/modules/articleForm/articleForm.module'
import {HttpClientModule} from '@angular/common/http'
import {EditArticleService} from './services/editArticle.service'
import {EffectsModule} from '@ngrx/effects'
import {EditArticleEffect} from './store/effects/editArticle.effect'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {ArticleService} from '../shared/services/article.service'
import {GetArticleEffect} from './store/effects/getArticle.effect'
import {LoadingModule} from '../shared/modules/loading/loading.module'

const routes: Routes = [
  {path: 'articles/:slug/edit', component: EditArticleComponent},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    HttpClientModule,
    StoreModule.forFeature('editArticle', reducers),
    EffectsModule.forFeature([EditArticleEffect, GetArticleEffect]),
    LoadingModule,
  ],
  declarations: [EditArticleComponent],
  exports: [],
  providers: [EditArticleService, ArticleService],
})
export class EditArticleModule {}
