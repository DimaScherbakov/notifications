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

  /**
   * Поток с оповещениями
   *
   * @type {any}
   */
  public notificationSource$ = range(1, 3).pipe(
      concatMap(index => of(index).pipe(delay(500 + (Math.random() * 1000)))),
  tap(index => {
    const notifications = this.generateRandomNotifications(index);
    this.notificationsService.notifications$.next(notifications);
  }));

  constructor(private notificationsService: NotificationsService) {}

  private generateRandomNotifications(index: number): NotificationInterface[] {
    const notifications = [];
    const random = Math.floor(Math.random() * 3) + 1;
    for (let i = random; i !== 0; i--) {
      const notification: NotificationInterface = {text: `notification ${index}_${i}`};
      notifications.push(notification);
    }
    return notifications;
  }
}
