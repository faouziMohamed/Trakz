import { Injectable } from '@angular/core';
import { INotification } from '@models/notifications';

const NOTIFICATIONS: INotification[] = [
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

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {}

  getNotifications() {
    return NOTIFICATIONS;
  }
}
