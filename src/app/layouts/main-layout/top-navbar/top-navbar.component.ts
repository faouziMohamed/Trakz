import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { defaultNavLabels } from '@models/navLabel';
import { NotificationsService } from '@/services/notifications/notifications.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INotification } from '@/app/models/notifications';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent implements OnInit {
  @Input() drawer: MatSidenav | undefined;
  @Input() isHandset$: Observable<boolean> | undefined;

  @Input() activePage: { title: string };
  currentDate: Date;
  notifications: INotification[] = [];

  constructor(
    private _notifications: NotificationsService,
    private _snackBar: MatSnackBar,
  ) {
    this.currentDate = new Date();
    this.activePage = { title: defaultNavLabels.MyDay };
  }

  isMyDay(title: string | defaultNavLabels) {
    return title === defaultNavLabels.MyDay;
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
  ngOnInit(): void {
    this.notifications = this._notifications.getNotifications();
  }
}
