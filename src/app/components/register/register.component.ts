import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { TranslateService } from '@ngx-translate/core';
import { Participant } from '../../models/participant';
import { ParticipantService } from '../../services/participant/participant.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegisterComponent implements OnInit {
  public participant: Participant;
  UserType = '';
  additionalForm = new FormGroup({
    // position: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordconfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  basicInfoForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    housenumber: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    countryName: new FormControl(''),
    postcode: new FormControl('', [Validators.required]),
    secondLineOfAddress: new FormControl(''),
    firstLineOfAddress: new FormControl(''),
    positionLongitude: new FormControl(''),
    positionLatitude: new FormControl(''),
    placeId: new FormControl(''),
  });

  constructor(
    private routerMachinery: Router,
    private translateMachinery: TranslateService,
    private participantService: ParticipantService
  ) {}

  ngOnInit() {}

  navigateHome(): void {
    this.routerMachinery.navigate(['register']);
  }

  autocompleteChanged(value: any) {
    if (value && value.addressInformation) {
      const addressInformation = value.addressInformation;
      if (addressInformation.city) {
        this.basicInfoForm.get('city').setValue(addressInformation.city);
      }
      if (addressInformation.housenumber) {
        this.basicInfoForm.get('housenumber').setValue(addressInformation.housenumber);
      }
      if (addressInformation.city) {
        this.basicInfoForm.get('city').setValue(addressInformation.city);
      }
      if (addressInformation.postCode) {
        this.basicInfoForm.get('postcode').setValue(addressInformation.postCode);
      }
      if (addressInformation.countryCode) {
        this.basicInfoForm.get('country').setValue(addressInformation.countryCode);
        this.basicInfoForm.get('countryName').setValue(addressInformation.countryName);
      }
      if (addressInformation.secondLineOfAddress) {
        this.basicInfoForm.get('secondLineOfAddress').setValue(addressInformation.secondLineOfAddress);
      }
      if (addressInformation.position) {
        this.basicInfoForm.get('positionLongitude').setValue(addressInformation.position.longitude);
        this.basicInfoForm.get('positionLatitude').setValue(addressInformation.position.latitude);
      }
      if (addressInformation.placeId) {
        this.basicInfoForm.get('placeId').setValue(addressInformation.placeId);
      }
      if (addressInformation.firstLineOfAddress) {
        this.basicInfoForm.get('firstLineOfAddress').setValue(addressInformation.firstLineOfAddress);
      }
    }
  }

  get password() {
    return this.additionalForm.get('password').value;
  }

  get passwordconfirm() {
    return this.additionalForm.get('passwordconfirm').value;
  }

  registerParticipant(index: number) {
    if (index === 0) {
      this.UserType = 'AF';
    } else if (index === 1) {
      this.UserType = 'HL';
    }
    this.participant = new Participant();
    const participantBasicInformation = this.basicInfoForm.value;
    const participantUserInfo: User = {
      firstName: participantBasicInformation.firstName,
      lastName: participantBasicInformation.lastName,
      email: participantBasicInformation.email,
      password: this.password,
    };
    this.participant.deserialize({
      user: participantUserInfo,
      position: {
        longitude: participantBasicInformation.positionLongitude,
        latitude: participantBasicInformation.positionLatitude,
      },
      type: this.UserType,
      country: participantBasicInformation.country,
      placeId: participantBasicInformation.placeId,
      postCode: participantBasicInformation.postcode,
      city: participantBasicInformation.city,
      phone: participantBasicInformation.phone,
      firstLineOfAddress: participantBasicInformation.firstLineOfAddress,
      secondLineOfAddress: participantBasicInformation.secondLineOfAddress,
    });
    this.participantService.registerParticipant(this.participant);
  }

  compare(): void {
    if (this.password !== this.passwordconfirm) {
      this.additionalForm.get('passwordconfirm').setErrors({
        notmatched: true,
      });
    }
  }

  onLogin() {
    this.routerMachinery.navigate(['/login']);
  }
}
