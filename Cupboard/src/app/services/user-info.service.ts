import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfoResponse } from '../interfaces/user.interface';
import {
  DisplayPreferences,
  ListResponse,
  ListTypes,
  UserInfoData,
} from '../interfaces';
import { UserUpdateResp } from '../user/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private baseUrl: string = environment.backendBaseUrl;

  constructor(private http: HttpClient) {}

  private handleError(ok: boolean, error: UserUpdateResp): UserUpdateResp {
    if (error.msg) return { ok, msg: error.msg };

    const { email, password, name, userName, budget } = error.errors!;

    let msg = 'An unknown error has occurred';
    if (email?.msg) msg = email.msg;
    else if (password?.msg) msg = password.msg;
    else if (name?.msg) msg = name.msg;
    else if (userName?.msg) msg = userName.msg;
    else if (budget?.msg) msg = budget.msg;

    return { ok, msg };
  }

  private setTokenHeader = (): HttpHeaders => {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('x-token', token);
  };

  public saveDisplayPreferences = (pref: DisplayPreferences): void => {
    //TODO: set unique identifier for each user
    localStorage.setItem('displayPreferences', JSON.stringify(pref));
  };

  public loadDisplayPreferences = (): DisplayPreferences => {
    return JSON.parse(localStorage.getItem('displayPreferences') || '{}');
  };

  public getSelf = (): Observable<UserInfoResponse> => {
    const url = `${this.baseUrl}/users/get-self`;
    const headers = this.setTokenHeader();
    return this.http.get<UserInfoResponse>(url, { headers });
  };

  public getUserList = (listType: ListTypes): Observable<ListResponse> => {
    //TODO: Set limit and from params
    // TODO: Handle undefined value
    const url = `${this.baseUrl}/users/get-list/${listType}?limit=5&from=0`;
    const headers = this.setTokenHeader();
    return this.http.get<ListResponse>(url, { headers });
  };

  public updateSelf = (info: UserInfoData): Observable<UserUpdateResp> => {
    const url = `${this.baseUrl}/users/update-self`;
    const headers = this.setTokenHeader();
    return this.http
      .put<UserUpdateResp>(url, info, { headers })
      .pipe(catchError(({ ok, error }) => of(this.handleError(ok, error))));
  };
}
