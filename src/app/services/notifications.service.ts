import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NotificationInterface } from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  /**
   * Глобальный поток приложения с оповещениями
   *
   * @type {BehaviorSubject<NotificationInterface[]>}
   */
  public notifications$: BehaviorSubject<NotificationInterface[]> = new BehaviorSubject<NotificationInterface[]>([]);
}
