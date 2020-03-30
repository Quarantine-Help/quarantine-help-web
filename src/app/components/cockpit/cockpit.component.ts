import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {

  constructor(public translate: TranslateService, private _router: Router) { }

  ngOnInit() {
  }

  navigateTo(route: string): void {
    this._router.navigate([route]);
  }

}
