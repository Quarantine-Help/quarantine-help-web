import { Component, OnInit } from '@angular/core';
import { IAuthMode, ILoginForm } from 'src/app/models/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router) {}

  ngOnInit() {}

  login(): void {
    console.log(this.loginForm.value);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  toSignup() {
    this.router.navigate(['/register']);
  }
}
