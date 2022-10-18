import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {CommentsService} from '../../services/comments.service'

import {IComment} from '../../types/comment.interface'
import {
  addCommentAction,
  addCommentFailureAction,
  addCommentSuccessAction,
} from '../actions/addComment.action'

@Injectable()
export class AddCommentEffect {
  comment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addCommentAction),
      switchMap(({slug, comment}) => {
        return this.commentService.addComment(slug, comment).pipe(
          map((comment: IComment) => {
            return addCommentSuccessAction({comment})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(addCommentFailureAction())
          })
        )
      })
    )
  })

  constructor(
    private actions$: Actions,
    private commentService: CommentsService
  ) {}
}
