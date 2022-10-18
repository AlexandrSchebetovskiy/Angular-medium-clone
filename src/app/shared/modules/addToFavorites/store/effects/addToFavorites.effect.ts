import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {AddToFavoritesService} from '../../services/addToFavorites.service'
import {
  addToFavorites,
  addToFavoritesFailure,
  addToFavoritesSuccess,
} from '../actions/addToFavorites.action'
import {IArticle} from '../../../../types/article.interface'

@Injectable()
export class AddToFavoritesEffect {
  addToFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addToFavorites),
      switchMap(({isFavorited, slug}) => {
        const article$ = isFavorited
          ? this.addToFavoritesService.removeFromFavorites(slug)
          : this.addToFavoritesService.addToFavorites(slug)
        return article$.pipe(
          map((article: IArticle) => {
            return addToFavoritesSuccess({article})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(addToFavoritesFailure())
          })
        )
      })
    )
  })

  constructor(
    private actions$: Actions,
    private addToFavoritesService: AddToFavoritesService
  ) {}
}
