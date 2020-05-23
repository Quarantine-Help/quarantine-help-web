import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Participant } from '../../models/participant';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  constructor(private http: HttpClient, private authenticationService: AuthService) {}

  registerParticipant(participant: Participant) {
    // You do it without auth
  }
}
