import { Component, OnInit } from '@angular/core';
import { IAuthMode } from 'src/app/models/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  AUTH_MODE: IAuthMode = IAuthMode.LOGIN;

  constructor() { }

  ngOnInit() {
  }

  setAuthMode(mode: string): void {
    this.AUTH_MODE = mode === 'register' ? IAuthMode.REGISTER : IAuthMode.LOGIN;
  }
}
