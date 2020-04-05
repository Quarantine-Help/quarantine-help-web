import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quarantinedhelp';

  constructor(private _translate: TranslateService) {
    _translate.addLangs(['en', 'de']);
    _translate.setDefaultLang('de');
    const browserLang = _translate.getBrowserLang();
    //_translate.use(browserLang && browserLang.match(/en|de/) ? browserLang : 'de');
    _translate.use('de');
  }

  private initLang(): void {

  }
}
