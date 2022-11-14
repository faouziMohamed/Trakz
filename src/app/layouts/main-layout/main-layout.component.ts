import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

type NotificationType = 'success' | 'warning' | 'danger';

export interface INotification {
  id: number;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  link: string;
  type: NotificationType;
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  isHandset$: Observable<boolean> = this._breakpointObserver
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
      count: 12,
    },
    {
      label: 'Important',
      link: '/important',
      icon: 'star',
      count: 3,
    },
    {
      label: 'Planned',
      link: '/planned',
      icon: 'calendar_month',
      count: 0,
    },
    {
      label: 'Tasks',
      link: '/tasks',
      icon: 'checklist',
      count: 145,
    },
    {
      label: 'Projects',
      link: '/projects',
      icon: 'folder',
      count: 1,
    },
  ];
  email = ' Shiba@mail.com';
  name = 'Shiba Inu';
  picture = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  notifications: INotification[] = [
    {
      id: 1,
      title: 'New Task',
      message: 'You have a new task',
      date: new Date(),
      read: false,
      link: '/tasks',
      type: 'success',
    },
    {
      id: 2,
      title: 'Unable to connect',
      message:
        'Unable to connect to the server due to network issues or server downtime. Please try again later.',
      date: new Date(),
      read: false,
      link: '',
      type: 'danger',
    },
    {
      id: 3,
      title: 'Task Completed',
      message: 'You have completed a task',
      date: new Date(),
      read: false,
      link: '/planned',
      type: 'warning',
    },
  ];

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _snackBar: MatSnackBar,
  ) {}

  chooseIcon(type: NotificationType) {
    switch (type) {
      case 'success':
        return 'done';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'error';
      default:
        return 'done';
    }
  }

  onNotificationClick(notification: INotification) {
    notification.read = true;
  }

  onNotificationDelete(notification: INotification) {
    this.notifications = this.notifications.filter(
      (item) => item.id !== notification.id,
    );

    this._snackBar.open('Notification deleted', 'Dismiss', { duration: 2000 });
  }
}
