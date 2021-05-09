import { Component } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationInterface } from '../../interfaces/notification.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent {

  public buffer: NotificationInterface[] = [];

  /**
   * Поток с оповещениями
   *
   * @type {Observable<NotificationInterface[]>}
   */
  public notifications$: Observable<NotificationInterface[]> = this.notificationsService.notifications$.asObservable().pipe(tap(notifications => {
    notifications.forEach(notification => this.buffer.push(notification));
  }));

  constructor(private notificationsService: NotificationsService) {}
}
