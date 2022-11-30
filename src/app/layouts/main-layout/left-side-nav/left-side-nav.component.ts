import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PageTitles } from '@models/navLabel';
import { IUser } from '@models/User';
import { Observable } from 'rxjs';

import { TaskService } from '@/services/tasks/task.service';

const NAV_LINKS = [
  {
    label: PageTitles.MyDay,
    link: '/my-day',
    icon: 'wb_sunny',
    count: 12,
  },
  {
    label: PageTitles.Important,
    link: '/important',
    icon: 'star',
    count: 3,
  },
  {
    label: PageTitles.Planned,
    link: '/planned',
    icon: 'calendar_month',
    count: 0,
  },
  {
    label: PageTitles.Tasks,
    link: '/tasks',
    icon: 'checklist',
    count: 145,
  },
  {
    label: PageTitles.Projects,
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

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _tasksService: TaskService,
  ) {}
}
