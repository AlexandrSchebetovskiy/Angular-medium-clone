import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {CommentsService} from '../../services/comments.service'

import {
  removeCommentAction,
  removeCommentFailureAction,
  removeCommentSuccessAction,
} from '../actions/removeComment.action'
import {getCommentsActions} from '../actions/getComments.actions'

@Injectable()
export class RemoveCommentsEffect {
  removeComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeCommentAction),
      switchMap(({slug, id}) => {
        return this.commentService.removeComment(slug, id).pipe(
          map(() => {
            return removeCommentSuccessAction({id})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(removeCommentFailureAction())
          })
        )
      })
    )
  })

  // refreshComments$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(removeCommentSuccessAction),
  //     switchMap(async () => getCommentsActions({slug: '12'}))
  //   )
  // })

  constructor(
    private actions$: Actions,
    private commentService: CommentsService
  ) {}
}
