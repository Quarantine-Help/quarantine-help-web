import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Participant } from '../../models/participant';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  constructor(private http: HttpClient, private injector: Injector) {}

  getMe() {
    const authService = this.injector.get(AuthService);
    const httpOptions = authService.getAuthHeaders();
    const participantData = this.http
      .get<Participant>(`${environment.apiUrl}/v1/me/`, httpOptions)
      .pipe(
        map((participant: Participant) => {
          localStorage.setItem('currentParticipant', JSON.stringify(participant));
          return participant;
        })
      )
      .subscribe();
    return new Participant().deserialize(participantData);
  }
}
