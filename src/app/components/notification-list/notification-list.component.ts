import { Component, ChangeDetectorRef } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationInterface } from '../../interfaces/notification.interface';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent {

  /**
   * Список отображаемых оповещений
   *
   * @type {NotificationInterface[]}
   */
  public displayedNotifications: NotificationInterface[] = [];

  /**
   * Очередь оповещений к отображению
   *
   * @type {[]}
   * @private
   */
  private buffer: NotificationInterface[] = [];

  /**
   * Максимальное количество одновременно отображаемых оповещений
   *
   * @type {number}
   * @private
   */
  private readonly notificationsLimit = 3;
  /**
   * Поток с оповещениями
   *
   * @type {Observable<NotificationInterface[]>}
   */
  public notifications$: Observable<NotificationInterface[]> = this.notificationsService.notifications$.asObservable()
  .pipe(
      tap(notifications => notifications.forEach(notification => this.buffer.push(notification))),
      tap(() => this.updateNotifications())
  );

  constructor(
      private notificationsService: NotificationsService,
      private cdRef: ChangeDetectorRef
  ) {}

  /**
   * Удаляет первое оповещение из списка отображаемых
   */
  public removeNotification(): void {
    this.displayedNotifications.splice(0, 1);
    this.cdRef.detectChanges();
    this.notificationsService.notifications$.next([]);
  }

  /**
   * Обновляет список отображаемы оповещений
   *
   * @private
   */
  private updateNotifications() {
    const rest = this.notificationsLimit - this.displayedNotifications.length;
    if (rest > 0) {
      const newNotifications = this.getBufferedNotifications(rest);
      newNotifications.forEach(notification => this.displayedNotifications.push(notification));
      this.cdRef.detectChanges();
    }
  }

  /**
   * Получает оповещения из буфера по количеству "свободных мест"
   *
   * @param {number} count
   * @return {[]}
   * @private
   */
  private getBufferedNotifications(count: number): NotificationInterface[] {
    return this.buffer.splice(0, count);
  }
}
