import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NotificationInterface } from '../../interfaces/notification.interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {

  /**
   * Оповещение
   *
   * @type {NotificationInterface}
   */
  @Input() public notification: NotificationInterface | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
