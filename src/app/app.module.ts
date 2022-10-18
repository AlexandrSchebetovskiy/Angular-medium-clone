import {NgModule, Provider} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {StoreModule} from '@ngrx/store'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {environment} from '../environments/environment'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {AuthModule} from './auth/auth.module'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {EffectsModule} from '@ngrx/effects'
import {TopbarModule} from './shared/modules/topbar/topbar.module'
import {PersistanceService} from './shared/services/persistance.service'
import {AuthInterceptor} from './shared/services/auth.interceptor.service'
import {GlobalFeedModule} from './globalFeed/globalFeed.module'
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store'
import {YourFeedModule} from './yourFeed/yourFeed.module'
import {TagFeedModule} from './tagFeed/tagFeed.module'
import {ArticleModule} from './article/article.module'
import {CreateArticleComponent} from './createArticle/components/createArticle/createArticle.component'
import {CreateArticleModule} from './createArticle/createArticle.module'
import {EditArticleModule} from './editArticle/editArticle.module'
import {SettingsModule} from './settings/settings.module'
import {UserProfileModule} from './userProfile/userProfile.module'
import {MarkdownModule} from 'ngx-markdown'

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    TopbarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    SettingsModule,
    UserProfileModule,
    StoreModule.forRoot({
      router: routerReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    MarkdownModule.forRoot(),
  ],
  providers: [PersistanceService, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
