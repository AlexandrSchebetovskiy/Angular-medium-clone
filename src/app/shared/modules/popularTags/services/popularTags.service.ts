import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'
import {PopularTagType} from '../../../types/popularTag.type'
import {environment} from '../../../../../environments/environment'
import {ITagResponse} from '../types/tagResponse.interface'

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags'
    return this.http.get<ITagResponse>(url).pipe(
      map((res) => {
        return res.tags
      })
    )
  }
}
