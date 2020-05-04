import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  LOGIN_URL = `v1/auth/login/`;
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(loginFormData) {
    this.http.post(`${this.BASE_URL}/${this.LOGIN_URL}`, loginFormData).subscribe((resp: any) => {
      this.isLoggedIn = true;
      this.cookieService.set('authToken', resp.token);
      this.cookieService.set('participantId', resp.participantId);
      this.cookieService.set('email', resp.email);
    });
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.isLoggedIn = false;
  }
}
