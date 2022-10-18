import {Injectable} from '@angular/core'
import {IRegisterRequest} from '../types/registerRequest.interface'
import {HttpClient} from '@angular/common/http'
import {IAuthResponse} from '../types/authResponse.interface'
import {map, Observable} from 'rxjs'
import {ICurrentUser} from '../../shared/types/currentUser.interface'
import {environment} from '../../../environments/environment'
import {ILoginRequest} from '../types/loginRequest.interface'
import {ICurrentUserInput} from '../../shared/types/currentUserInput.interface'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: IRegisterRequest): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/users'
    return this.http.post<IAuthResponse>(url, data).pipe(map(this.getUser))
  }

  login(data: ILoginRequest): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/users/login'
    return this.http.post<IAuthResponse>(url, data).pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/user'
    return this.http.get<IAuthResponse>(url).pipe(map(this.getUser))
  }
  updateCurrentUser(
    currentUserInput: ICurrentUserInput
  ): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/user'
    return this.http
      .put<IAuthResponse>(url, {user: currentUserInput})
      .pipe(map(this.getUser))
  }
  private getUser(response: IAuthResponse): ICurrentUser {
    return response.user
  }
}
