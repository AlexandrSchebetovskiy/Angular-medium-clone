import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {ArticleService} from '../../../shared/services/article.service'
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '../action/getArticle.action'
import {IArticle} from '../../../shared/types/article.interface'

@Injectable()
export class GetArticleEffect {
  feed$ = createEffect(() => {
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
