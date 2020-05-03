import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { TranslateService } from '@ngx-translate/core';
import { PlaceSuggestion } from '../auto-complete/auto-complete.component';

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
  additionalForm = new FormGroup({
    // position: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordconfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    /* placeId: new FormControl('', [Validators.required]),
    is_available: new FormControl('', [Validators.required]),
    crisis: new FormControl('', [Validators.required]),
    abilities: new FormControl('', [Validators.required]), */
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
    secondAddress: new FormControl(''),
  });

  constructor(private routerMachinery: Router, private translateMachinery: TranslateService) {}

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
        this.basicInfoForm.get('secondAddress').setValue(addressInformation.secondLineOfAddress);
      }
    }
  }

  get password() {
    return this.additionalForm.get('password');
  }
  get passwordconfirm() {
    return this.additionalForm.get('passwordconfirm');
  }

  compare(): void {
    if (this.password.value !== this.passwordconfirm.value) {
      this.passwordconfirm.setErrors({
        notmatched: true,
      });
    }
  }
}
