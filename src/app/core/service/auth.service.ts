import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';

  constructor(private httpClient: HttpClient) {}

  login(credentials: LoginRequest): Observable<string> {
    return this.httpClient
      .post('/api/login', credentials, { responseType: 'text' })
      .pipe(
        tap(token => sessionStorage.setItem(this.tokenKey, token))
      );
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
  }
}

