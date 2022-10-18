import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {ArticleService} from '../../../shared/services/article.service'

import {IArticle} from '../../../shared/types/article.interface'
import {
  removeArticleAction,
  removeArticleFailureAction,
  removeArticleSuccessAction,
} from '../action/removeArticle.action'
import {Router} from '@angular/router'

@Injectable()
export class RemoveArticleEffect {
  feed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeArticleAction),
      switchMap(({slug}) => {
        return this.articleService.deleteArticle(slug).pipe(
          map(() => {
            return removeArticleSuccessAction()
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(removeArticleFailureAction())
          })
        )
      })
    )
  })
  redirectAfterDelete$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(removeArticleSuccessAction),
        tap(() => {
          this.router.navigate(['/'])
        })
      )
    },
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private router: Router
  ) {}
}
