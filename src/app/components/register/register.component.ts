import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { TranslateService } from "@ngx-translate/core";
import { PlaceSuggestion } from "../auto-complete/auto-complete.component";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})
export class RegisterComponent implements OnInit {
  additionalForm = new FormGroup({
    //position: new FormControl('', [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]),
    passwordconfirm: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
    /* placeId: new FormControl('', [Validators.required]),
    is_available: new FormControl('', [Validators.required]),
    crisis: new FormControl('', [Validators.required]),
    abilities: new FormControl('', [Validators.required]), */
  });

  basicInfoForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    street: new FormControl("", [Validators.required]),
    housenumber: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    postcode: new FormControl("", [Validators.required]),
    secondAddress: new FormControl("")
  });

  constructor(private _router: Router, private _translate: TranslateService) {}

  ngOnInit() {}

  navigateHome(): void {
    this._router.navigate(["register"]);
  }

  autocompleteChanged(value: any) {
    console.log("LALA", value);
    if (value && value.data) {
      const info = value.data.address;
      if (info.city) {
        this.basicInfoForm.get("city").setValue(info.city);
      }
      if (info.houseNumber) {
        this.basicInfoForm.get("housenumber").setValue(info.houseNumber);
      }
      if (info.street) {
        this.basicInfoForm.get("street").setValue(info.street);
      }
      if (info.city) {
        this.basicInfoForm.get("city").setValue(info.city);
      }
      if (info.postalCode) {
        this.basicInfoForm.get("postcode").setValue(info.postalCode);
      }
      if (info.country) {
        this.basicInfoForm.get("country").setValue(info.country);
      }
    }
  }

  get password() {
    return this.additionalForm.get("password");
  }
  get passwordconfirm() {
    return this.additionalForm.get("passwordconfirm");
  }

  compare(): void {
    if (this.password.value !== this.passwordconfirm.value) {
      this.passwordconfirm.setErrors({
        notmatched: true
      });
    }
  }
}
