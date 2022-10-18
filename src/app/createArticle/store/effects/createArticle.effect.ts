import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {Router} from '@angular/router'

import {CreateArticleService} from '../../services/createArticle.service'
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from '../actions/createArticle.action'
import {IArticle} from '../../../shared/types/article.interface'

@Injectable()
export class CreateArticleEffect {
  createArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({article}) => {
        return this.createArticleService.createArticle(article).pipe(
          map((article: IArticle) => {
            return createArticleSuccessAction({article})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse)
            return of(
              createArticleFailureAction({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  })

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({article}) => {
          this.router.navigate(['/articles', article.slug])
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router
  ) {}
}
