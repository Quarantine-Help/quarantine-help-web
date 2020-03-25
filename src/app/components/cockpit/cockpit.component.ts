import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  navigateTo(route: string): void {
    this._router.navigate([route]);
  }

}
