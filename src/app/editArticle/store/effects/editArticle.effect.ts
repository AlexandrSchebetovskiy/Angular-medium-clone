import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {Router} from '@angular/router'

import {EditArticleService} from '../../services/editArticle.service'
import {
  editArticleAction,
  editArticleFailureAction,
  editArticleSuccessAction,
} from '../actions/editArticle.action'
import {IArticle} from '../../../shared/types/article.interface'

@Injectable()
export class EditArticleEffect {
  editArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editArticleAction),
      switchMap(({article, slug}) => {
        return this.editArticleService.updateArticle(article, slug).pipe(
          map((article: IArticle) => {
            return editArticleSuccessAction({article})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              editArticleFailureAction({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  })

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editArticleSuccessAction),
        tap(({article}) => {
          this.router.navigate(['/articles', article.slug])
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private router: Router
  ) {}
}
