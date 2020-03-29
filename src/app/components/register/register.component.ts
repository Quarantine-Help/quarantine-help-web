import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class RegisterComponent implements OnInit {

  additionalForm = new FormGroup({
    //position: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    /* googlePlaceId: new FormControl('', [Validators.required]),
    is_available: new FormControl('', [Validators.required]),
    crisis: new FormControl('', [Validators.required]),
    abilities: new FormControl('', [Validators.required]), */
  });

  basicInfoForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
   /*  lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstAddress: new FormControl('', [Validators.required]),
    secondAddress: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required]), */
  })

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  navigateHome(): void {
    this._router.navigate(['register']);
  }
}
