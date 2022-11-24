export type NotificationType = 'success' | 'warning' | 'danger';

export interface INotification {
  id: number;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  link: string;
  type: NotificationType;
}
