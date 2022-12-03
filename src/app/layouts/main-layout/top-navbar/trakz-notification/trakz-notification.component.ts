/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';

import { INotification } from '@/models/notifications';
import { NotificationsService } from '@/services/notifications/notifications.service';

@Component({
  selector: 'app-trakz-notification',
  templateUrl: './trakz-notification.component.html',
  styleUrls: ['./trakz-notification.component.scss'],
})
export class TrakzNotificationComponent implements OnInit {
  notifications: INotification[] = [];

  constructor(private _notifications: NotificationsService) {}

  ngOnInit(): void {
    this.notifications = this._notifications.getNotifications();
  }

  onNotificationClick(notification: INotification) {
    // eslint-disable-next-line no-param-reassign
    notification.read = true;
  }

  onNotificationDelete(notification: INotification) {
    this.notifications = this.notifications.filter(
      (item) => item.id !== notification.id,
    );
  }
}
