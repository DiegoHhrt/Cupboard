import { Injectable } from '@angular/core';
import { ListResponse, ListTypes } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListActionsService {
  private baseUrl: string = environment.backendBaseUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: any): void {
    throw new Error('Method not implemented.');
  }

  private setTokenHeader = (): HttpHeaders => {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('x-token', token);
  };

  public getHouseholdList = () => {};
}
