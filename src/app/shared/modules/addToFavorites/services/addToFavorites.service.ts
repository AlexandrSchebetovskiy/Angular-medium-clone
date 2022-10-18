import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'
import {environment} from '../../../../../environments/environment'
import {IArticle} from '../../../types/article.interface'
import {IArticleResponse} from '../../../types/articleResponse.interface'

@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  addToFavorites(slug: string): Observable<IArticle> {
    const url = this.getUrl(slug)
    return this.http.post<IArticleResponse>(url, {}).pipe(map(this.getArticle))
  }
  removeFromFavorites(slug: string): Observable<IArticle> {
    const url = this.getUrl(slug)
    return this.http
      .delete<IArticleResponse>(url, {})
      .pipe(map(this.getArticle))
  }

  private getUrl(slug: string) {
    return `${environment.apiUrl}/articles/${slug}/favorite`
  }

  private getArticle(res: IArticleResponse): IArticle {
    return res.article
  }
}
