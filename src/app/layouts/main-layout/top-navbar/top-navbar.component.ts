/* eslint-disable no-param-reassign,class-methods-use-this */
import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { INotification } from '@/app/models/notifications';
import { PageTitles } from '@/models/navLabel';
import { NotificationsService } from '@/services/notifications/notifications.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent {
  @Input() drawer: MatSidenav | undefined;

  @Input() isHandset$: Observable<boolean> | undefined;

  @Input() activePage: PageTitles;

  currentDate = '';

  notifications: INotification[] = [];

  constructor(
    private _notifications: NotificationsService,
    private _snackBar: MatSnackBar,
  ) {
    this.activePage = PageTitles.MyDay;
    this.currentDate = formatDate(new Date(), 'EEEE, MMMM d', 'en-US');
  }

  isMyDay(title: PageTitles) {
    return title === PageTitles.MyDay;
  }
}
