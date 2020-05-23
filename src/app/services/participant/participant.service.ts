import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Participant } from '../../models/participant';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  constructor(private http: HttpClient) {}

  registerParticipant(participantData: Participant) {
    // You do it without auth
    this.http
      .post(`${environment.apiUrl}/v1/auth/register/`, participantData)
      .pipe(
        map((participant: Participant) => {
          console.log(participant);
        })
      )
      .subscribe();
  }
}
