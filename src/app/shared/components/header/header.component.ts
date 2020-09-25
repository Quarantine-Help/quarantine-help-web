import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

// tslint:disable-next-line:component-selector
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  languageIcon = { de: null, en: null };
  buttonInfo = {
    title: 'login',
    url: '/login',
  };

  currentUser = null;

  constructor(
    public translateMachinery: TranslateService,
    private routerMachinery: Router,
    private sanitizerMachinery: DomSanitizer
  ) {
    this.languageIcon.de = sanitizerMachinery.bypassSecurityTrustStyle('url(./assets/icons/de.png)');
    this.languageIcon.en = sanitizerMachinery.bypassSecurityTrustStyle('url(./assets/icons/en.png)');
  }

  ngOnInit() {
    this.routerMachinery.events.subscribe((val: any) => {
      if (val && val.url && (val.url === '/register' || val.url === '/cockpit')) {
        this.buttonInfo.title = this.translateMachinery.instant('auth.login');
        this.buttonInfo.url = '/login';
      } else if (val && val.url && val.url === '/login') {
        this.buttonInfo.title = this.translateMachinery.instant('auth.register');
        this.buttonInfo.url = '/register';
      }
    });
  }

  navigateTo(route: string): void {
    this.routerMachinery.navigate([route]);
  }
}
