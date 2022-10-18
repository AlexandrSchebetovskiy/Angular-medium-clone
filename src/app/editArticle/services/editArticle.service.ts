import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {IArticleInput} from '../../shared/types/articleInput.interface'
import {map, Observable} from 'rxjs'
import {IArticle} from '../../shared/types/article.interface'
import {environment} from '../../../environments/environment'
import {ISaveArticleResponse} from '../../shared/types/saveArticleResponse.interface'

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(article: IArticleInput, slug: string): Observable<IArticle> {
    const fullUrl = environment.apiUrl + '/articles/' + slug
    return this.http
      .put<ISaveArticleResponse>(fullUrl, {article})
      .pipe(map((res: ISaveArticleResponse) => res.article))
  }
}
