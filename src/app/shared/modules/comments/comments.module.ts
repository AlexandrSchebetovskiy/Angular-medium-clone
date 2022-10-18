import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CommentsComponent} from './components/comments/comments.component'
import {HttpClientModule} from '@angular/common/http'
import {EffectsModule} from '@ngrx/effects'
import {GetCommentsEffect} from './store/effects/getComments.effect'
import {CommentsService} from './services/comments.service'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {RouterModule} from '@angular/router'
import {LoadingModule} from '../loading/loading.module'
import {CommentItemComponent} from './components/commentItem/commentItem.component'
import {RemoveCommentsEffect} from './store/effects/removeComment.effect'
import {AddCommentComponent} from './components/addComment/addComment.component'
import {BackendErrorMessagesModule} from '../backendErrorMessages/backendErrorMessages.module'
import {ReactiveFormsModule} from '@angular/forms'
import {AddCommentEffect} from './store/effects/addComment.effect'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([
      GetCommentsEffect,
      RemoveCommentsEffect,
      AddCommentEffect,
    ]),
    StoreModule.forFeature('comments', reducers),
    LoadingModule,
    BackendErrorMessagesModule,
  ],
  declarations: [CommentsComponent, CommentItemComponent, AddCommentComponent],
  exports: [CommentsComponent],
  providers: [CommentsService],
})
export class CommentsModule {}
