import { Component } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private spinnerService: Ng4LoadingSpinnerService, private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {

      if (routerEvent instanceof NavigationStart) {
        this.spinnerService.show();
      } else if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
        this.spinnerService.hide();
      }
    });
  }
}
