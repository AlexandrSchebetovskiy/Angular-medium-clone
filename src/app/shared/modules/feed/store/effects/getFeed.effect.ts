import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {FeedService} from '../../services/feed.service'
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from '../action/getFeed.action'
import {IFeedResponse} from '../../types/feedResponse.interface'

@Injectable()
export class GetFeedEffect {
  feed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({url}) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: IFeedResponse) => {
            return getFeedSuccessAction({feed})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getFeedFailureAction())
          })
        )
      })
    )
  })

  constructor(private actions$: Actions, private feedService: FeedService) {}
}
