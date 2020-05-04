import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService extends ApiService {
  REGISTER_URL = 'v1/auth/register/';

  registerParticipant(basicFormData, additionalFormData) {
    const postData = {
      user: {
        firstName: basicFormData.firstName,
        lastName: basicFormData.lastName,
        email: basicFormData.email,
        password: additionalFormData.password,
      },
      position: basicFormData.position,
      type: 'AF',
      firstLineOfAddress: basicFormData.firstLineOfAddress,
      secondLineOfAddress: basicFormData.secondLineOfAddress,
      placeId: basicFormData.placeId,
      postCode: basicFormData.postcode,
      city: basicFormData.city,
      country: basicFormData.country,
      crisis: 1,
      phone: basicFormData.phone,
    };
    this.http.post(`${this.BASE_URL}/${this.REGISTER_URL}`, postData).subscribe((resp) => {
      console.log(resp);
    });
  }
}
