import { Component } from '@angular/core';
import { NotificationInterface } from './interfaces/notification.interface';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notification';

  /**
   * Notification list
   *
   * @type {NotificationInterface[]}
   */
  notifications: NotificationInterface[] = [
    {text: 'notification 1'},
    {text: 'notification 2'},
    {text: 'notification 3'},
    {text: 'notification 4'},
  ];

  constructor (private notificationsService: NotificationsService) {}

  /**
   * Отправляет оповещения в список
   */
  emitNotifications(): void {
    this.notificationsService.notifications$.next(this.notifications);
  }
}
