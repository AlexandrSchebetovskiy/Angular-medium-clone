import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {UserProfileService} from '../../services/userProfile.service'
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from '../actions/getUserProfile.action'
import {IProfile} from '../../../shared/types/profile.interface'

@Injectable()
export class GetUserProfileEffect {
  userProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({slug}) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((profile: IProfile) => {
            return getUserProfileSuccessAction({profile})
          }),
          catchError(() => {
            return of(getUserProfileFailureAction())
          })
        )
      })
    )
  })

  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService
  ) {}
}
