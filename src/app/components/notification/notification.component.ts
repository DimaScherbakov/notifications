import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NotificationInterface } from '../../interfaces/notification.interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnChanges {

  /**
   * Оповещение
   *
   * @type {NotificationInterface}
   */
  @Input() public notification: NotificationInterface | null = null;

  /**
   * Было ли оповещение удалено
   *
   * @type {EventEmitter<boolean>}
   */
  @Output() isRemoved: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Время жизни оповещения
   *
   * @type {number}
   * @private
   */
  private readonly timeLimit = 5000;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.notification) {
      setTimeout(() => this.removeNotification(), this.timeLimit);
    }
  }

  /**
   * Удаляет оповещение
   *
   * @private
   */
  private removeNotification(): void {
    this.isRemoved.emit(true);
    this.notification = null;
  }
}
