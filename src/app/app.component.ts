import { Component } from '@angular/core';
import { NotificationInterface } from './interfaces/notification.interface';
import { NotificationsService } from './services/notifications.service';
import { concatMap, delay, tap } from 'rxjs/operators';
import { range } from 'rxjs/internal/observable/range';
import { of } from 'rxjs/internal/observable/of';

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


  public notificationSource$ = range(1, 10).pipe(
      concatMap(i => of(i).pipe(delay(500 + (Math.random() * 1000)))),
  tap(index => {
    const notifications = this.generateRandomNotifications(index);
    this.notificationsService.notifications$.next(notifications);
  }));

  constructor(private notificationsService: NotificationsService) {}

  /**
   * Отправляет оповещения в список
   */
  public emitNotifications(): void {
    this.notificationsService.notifications$.next(this.notifications);
  }

  private generateRandomNotifications(index: number): NotificationInterface[] {
    const notifications = [];
    const notification: NotificationInterface = {text: `notification ${index}`};
    const random = Math.floor(Math.random() * 6) + 1;
    for (let i = random; i !== 0; i--) {
      notifications.push(notification);
    }
    return notifications;
  }
}
