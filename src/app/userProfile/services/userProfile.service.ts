import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'
import {IProfile} from '../../shared/types/profile.interface'
import {environment} from '../../../environments/environment'
import {IUserProfileResponse} from '../types/userProfileResponse.interface'

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<IProfile> {
    const url = `${environment.apiUrl}/profiles/${slug}`
    return this.http
      .get<IUserProfileResponse>(url)
      .pipe(map((res: IUserProfileResponse) => res.profile))
  }
}
