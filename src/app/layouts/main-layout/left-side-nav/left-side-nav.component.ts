import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IUser } from '@models/User';
import { MatSidenav } from '@angular/material/sidenav';

enum defaultNavLabels {
  MyDay = 'My Day',
  Important = 'Important',
  Planned = 'Planned',
  Tasks = 'Tasks',
  Projects = 'Projects',
}

const NAV_LINKS = [
  {
    label: defaultNavLabels.MyDay,
    link: '/my-day',
    icon: 'wb_sunny',
    count: 12,
  },
  {
    label: defaultNavLabels.Important,
    link: '/important',
    icon: 'star',
    count: 3,
  },
  {
    label: defaultNavLabels.Planned,
    link: '/planned',
    icon: 'calendar_month',
    count: 0,
  },
  {
    label: defaultNavLabels.Tasks,
    link: '/tasks',
    icon: 'checklist',
    count: 145,
  },
  {
    label: defaultNavLabels.Projects,
    link: '/projects',
    icon: 'folder',
    count: 1,
  },
];
@Component({
  selector: 'app-left-side-nav',
  templateUrl: './left-side-nav.component.html',
  styleUrls: ['./left-side-nav.component.scss'],
})
export class LeftSideNavComponent {
  @Input() isHandset$: Observable<boolean> | undefined;
  navLinks = NAV_LINKS;
  @Input() user: IUser | undefined;
  @Input() drawer: MatSidenav | undefined;
  @Input() activePage: { title: string } | undefined;
  constructor(private _breakpointObserver: BreakpointObserver) {}
}
