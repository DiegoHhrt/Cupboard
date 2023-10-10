import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HouseholdInfoResponse, ListResponse, ListTypes } from '../interfaces';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HouseholdInfoService {
  private baseUrl: string = environment.backendBaseUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: any): void {
    throw new Error('Method not implemented.');
  }

  private setTokenHeader = (): HttpHeaders => {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('x-token', token);
  };

  public getSelf = (): Observable<HouseholdInfoResponse> => {
    const url = `${this.baseUrl}/household`;
    const headers = this.setTokenHeader();
    return this.http
      .get<HouseholdInfoResponse>(url, { headers })
      .pipe(catchError((err) => of({ ok: false })));
  };

  public getHouseholdList = (listType: ListTypes): Observable<ListResponse> => {
    //TODO: Set limit and from params
    const url = `${this.baseUrl}/household/get-list/${listType}?limit=5&from=0`;
    const headers = this.setTokenHeader();
    return this.http.get<ListResponse>(url, { headers });
  };
}
