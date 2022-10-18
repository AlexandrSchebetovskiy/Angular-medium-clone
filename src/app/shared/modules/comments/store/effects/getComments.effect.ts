import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {CommentsService} from '../../services/comments.service'
import {
  getCommentsActions,
  getCommentsFailureActions,
  getCommentsSuccessActions,
} from '../actions/getComments.actions'
import {IComment} from '../../types/comment.interface'

@Injectable()
export class GetCommentsEffect {
  comments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCommentsActions),
      switchMap(({slug}) => {
        return this.commentService.getComments(slug).pipe(
          map((comments: IComment[]) => {
            return getCommentsSuccessActions({comments})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getCommentsFailureActions())
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
