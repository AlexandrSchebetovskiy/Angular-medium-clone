import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'
import {environment} from '../../../../../environments/environment'
import {IUserProfileResponse} from '../../../../userProfile/types/userProfileResponse.interface'
import {IProfile} from '../../../types/profile.interface'

@Injectable()
export class FollowProfileService {
  constructor(private http: HttpClient) {}

  follow(slug: string): Observable<IProfile> {
    const url = this.getUrl(slug)
    return this.http
      .post<IUserProfileResponse>(url, {})
      .pipe(map(this.getProfile))
  }
  unfollow(slug: string): Observable<IProfile> {
    const url = this.getUrl(slug)
    return this.http
      .delete<IUserProfileResponse>(url, {})
      .pipe(map(this.getProfile))
  }

  private getUrl(slug: string) {
    return `${environment.apiUrl}/profiles/${slug}/follow`
  }

  private getProfile(res: IUserProfileResponse): IProfile {
    return res.profile
  }
}
