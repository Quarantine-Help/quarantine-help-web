import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss'],
})
export class CockpitComponent implements OnInit {
  constructor(public translateMachinery: TranslateService, private routerMachinery: Router) {}

  ngOnInit() {}

  navigateTo(route: string): void {
    this.routerMachinery.navigate([route]);
  }
}
