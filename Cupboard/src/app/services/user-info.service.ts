import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  DisplayPreferences,
  ListResponse,
  ListTypes,
  UserInfoResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private baseUrl: string = environment.backendBaseUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: any): void {
    throw new Error('Method not implemented.');
  }

  private setTokenHeader = (): HttpHeaders => {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('x-token', token);
  };

  public saveDisplayPreferences = (pref: DisplayPreferences): void => {
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
    const url = `${this.baseUrl}/users/get-list/${listType}?limit=5&from=0`;
    const headers = this.setTokenHeader();
    return this.http.get<ListResponse>(url, { headers });
  };

  public updateSelf = () => {};
}
