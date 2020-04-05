import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  languageIcon = { 'de': null, 'en': null };
  buttonInfo = {
    title: 'login',
    url: '/login'
  }

  currentUser = null;

  constructor(public translate: TranslateService, private _router: Router, private _sanitizer: DomSanitizer) {
    this.languageIcon.de = _sanitizer.bypassSecurityTrustStyle('url(./assets/icons/de.png)');
    this.languageIcon.en = _sanitizer.bypassSecurityTrustStyle('url(./assets/icons/en.png)');
  }

  ngOnInit() {
    this._router.events.subscribe((val: any) => {
      if (val && val.url && (val.url === '/register' || val.url === '/cockpit')) {
        this.buttonInfo.title = this.translate.instant('auth.login');
        this.buttonInfo.url = '/login'
      } else if (val && val.url && val.url === '/login') {
        this.buttonInfo.title = this.translate.instant('auth.register');
        this.buttonInfo.url = '/register'
      }
    });
  }

  navigateTo(route: string): void {
    this._router.navigate([route]);
  }


}
