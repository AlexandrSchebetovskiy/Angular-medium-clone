import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {IArticle} from '../../../shared/types/article.interface'
import {ArticleService} from '../../../shared/services/article.service'
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '../actions/getArticle.action'

@Injectable()
export class GetArticleEffect {
  getArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({slug}) => {
        return this.articleService.getArticle(slug).pipe(
          map((article: IArticle) => {
            return getArticleSuccessAction({article})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getArticleFailureAction())
          })
        )
      })
    )
  })

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {}
}
