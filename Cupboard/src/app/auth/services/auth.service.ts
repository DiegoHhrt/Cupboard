import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import {
  UserLoginData,
  UserLoginResp,
  UserSignUpData,
  UserSignUpResp,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private baseUrl: string = environment.baseUrl;
  private baseUrl: string = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  private handleError(ok: boolean, error: UserLoginResp): UserLoginResp {
    if (error.msg) return { ok, msg: error.msg };

    const { email, password, name, userName } = error.errors!;

    let msg = 'An unknown error has occurred';
    if (email?.msg) msg = email.msg;
    else if (password?.msg) msg = password.msg;
    else if (name?.msg) msg = name.msg;
    else if (userName?.msg) msg = userName.msg;

    return { ok, msg };
  }

  public login = (body: UserLoginData): Observable<UserLoginResp> => {
    const url = `${this.baseUrl}/auth/`;

    return this.http.post<UserLoginResp>(url, body).pipe(
      tap(({ ok, token }) => {
        if (ok) localStorage.setItem('token', token!);
      }),
      catchError(({ ok, error }) => of(this.handleError(ok, error)))
    );
  };
  public signUp = (body: UserSignUpData): Observable<UserSignUpResp> => {
    const url = `${this.baseUrl}/auth/register`;

    return this.http.post<UserSignUpResp>(url, body).pipe(
      tap(({ ok, token }) => {
        // if (ok) localStorage.setItem('token', token!);
      }),
      catchError(({ ok, error }) => of(this.handleError(ok, error)))
    );
  };
}
