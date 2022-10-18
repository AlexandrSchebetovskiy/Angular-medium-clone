import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {IArticleResponse} from '../types/articleResponse.interface'
import {IArticle} from '../types/article.interface'

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<IArticle> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`
    return this.http
      .get<IArticleResponse>(fullUrl)
      .pipe(map((res: IArticleResponse) => res.article))
  }

  deleteArticle(slug: string): Observable<{}> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`
    return this.http.delete<{}>(fullUrl)
  }
}
