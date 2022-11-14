import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );
  navLinks = [
    {
      label: 'My Day',
      link: '/my-day',
      icon: 'wb_sunny',
    },
    {
      label: 'Important',
      link: '/important',
      icon: 'star',
    },
    {
      label: 'Planned',
      link: '/planned',
      icon: 'calendar_month',
    },
    {
      label: 'Tasks',
      link: '/tasks',
      icon: 'checklist',
    },
    {
      label: 'Projects',
      link: '/projects',
      icon: 'folder',
    },
  ];
  email = ' Shiba@mail.com';
  name = 'Shiba Inu';
  picture = 'https://material.angular.io/assets/img/examples/shiba1.jpg';

  constructor(private breakpointObserver: BreakpointObserver) {}
}
