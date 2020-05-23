import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Participant } from '../../models/participant';
import { MeService } from '../me/me.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  private currentParticipantSubject: BehaviorSubject<Participant>;
  public currentParticipant: Observable<Participant>;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient, private meService: MeService) {
    this.currentParticipantSubject = new BehaviorSubject<Participant>(
      JSON.parse(localStorage.getItem('currentParticipant'))
    );
    this.currentParticipant = this.currentParticipantSubject.asObservable();
  }

  login(email, password) {
    return this.http
      .post(`${environment.apiUrl}/v1/auth/login/`, {
        email,
        password,
      })
      .pipe(
        map((user: any) => {
          this.isLoggedIn = true;
          localStorage.setItem('token', user.token);
          const participant = this.meService.getMe();
          // After this, immediately call the me user service.
          this.currentParticipantSubject.next(participant);
        })
      );
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('currentParticipant');
    localStorage.removeItem('token');
    this.currentParticipantSubject.next(null);
  }
}
