import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {}

  login(email, password): Observable<{}> {
    return this.http
      .post(`${environment.apiUrl}/v1/auth/login/`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          this.isLoggedIn = true;
          // After this, immediately call the me user service.

          return user;
        })
      );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
