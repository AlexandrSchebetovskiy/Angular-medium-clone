import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'

import {FollowProfileService} from '../../services/followProfile..service'

import {
  followProfile,
  followProfileFailure,
  followProfileSuccess,
} from '../actions/addToFavorites.action'
import {IProfile} from '../../../../types/profile.interface'

@Injectable()
export class FollowProfileEffect {
  followProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(followProfile),
      switchMap(({isFollowed, slug}) => {
        const profile$ = isFollowed
          ? this.followProfileService.follow(slug)
          : this.followProfileService.unfollow(slug)
        return profile$.pipe(
          map((profile: IProfile) => {
            return followProfileSuccess({profile})
          }),
          catchError(() => {
            return of(followProfileFailure())
          })
        )
      })
    )
  })

  constructor(
    private actions$: Actions,
    private followProfileService: FollowProfileService
  ) {}
}
