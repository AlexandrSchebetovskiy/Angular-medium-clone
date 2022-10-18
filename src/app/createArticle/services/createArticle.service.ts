import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {IArticleInput} from '../../shared/types/articleInput.interface'
import {map, Observable} from 'rxjs'
import {IArticle} from '../../shared/types/article.interface'
import {environment} from '../../../environments/environment'
import {ISaveArticleResponse} from '../../shared/types/saveArticleResponse.interface'

@Injectable()
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(article: IArticleInput): Observable<IArticle> {
    const fullUrl = environment.apiUrl + '/articles'

    console.log(article)
    return this.http
      .post<ISaveArticleResponse>(fullUrl, {article})
      .pipe(map((res: ISaveArticleResponse) => res.article))
  }
}
