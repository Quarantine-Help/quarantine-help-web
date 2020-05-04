import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL = 'http://127.0.0.1:8000/api';
  constructor(protected http: HttpClient, protected cookieService: CookieService) {}
}
