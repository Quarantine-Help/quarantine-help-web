import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'quarantinedhelp';

  constructor(private translateMachinery: TranslateService) {
    translateMachinery.addLangs(['en', 'de']);
    translateMachinery.setDefaultLang('de');
    const browserLang = translateMachinery.getBrowserLang();
    // _translate.use(browserLang && browserLang.match(/en|de/) ?
    // browserLang : 'de');
    translateMachinery.use('de');
  }

  private initLang(): void {}
}
