import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {IComment} from '../types/comment.interface'
import {map, Observable} from 'rxjs'
import {environment} from '../../../../../environments/environment'
import {ICommentGetResponse} from '../types/commentsGetResponse.interface'
import {ICommentPostResponse} from '../types/commentPostResponse.interface'
import {ICommentRequest} from '../types/commentRequest.interface'

@Injectable()
export class CommentsService {
  constructor(private http: HttpClient) {}

  getComments(slug: string): Observable<IComment[]> {
    const url = this.getUrl(slug)
    return this.http
      .get<ICommentGetResponse>(url)
      .pipe(map((res: ICommentGetResponse) => res.comments))
  }
  addComment(slug: string, comment: ICommentRequest): Observable<IComment> {
    const url = this.getUrl(slug)
    return this.http
      .post<ICommentPostResponse>(url, {comment})
      .pipe(map((res: ICommentPostResponse) => res.comment))
  }
  removeComment(slug: string, commentId: number): Observable<number> {
    const url = this.getUrl(slug) + '/' + commentId
    return this.http.delete<void>(url, {}).pipe(map(() => commentId))
  }

  private getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/comments`
  }
}
