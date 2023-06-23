/* eslint-disable @typescript-eslint/no-empty-function,class-methods-use-this */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent {
  @Input() iconName = 'check';

  @Input() textClasses = '';

  @Input() iconClasses = '';

  @Input() text = 'Task Detail';

  @Input() onClose = () => {};

  @Input() onClick = () => {};
}
