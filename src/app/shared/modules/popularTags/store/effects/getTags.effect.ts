import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {
  getTagAction,
  getTagFailureAction,
  getTagSuccessAction,
} from '../actions/getTags.action'
import {PopularTagsService} from '../../services/popularTags.service'
import {ITagResponse} from '../../types/tagResponse.interface'
import {PopularTagType} from '../../../../types/popularTag.type'

@Injectable()
export class GetTagsEffect {
  feed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTagAction),
      switchMap(() => {
        return this.tagService.getTags().pipe(
          map((tags: PopularTagType[]) => {
            return getTagSuccessAction({tags})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getTagFailureAction())
          })
        )
      })
    )
  })

  constructor(
    private actions$: Actions,
    private tagService: PopularTagsService
  ) {}
}
