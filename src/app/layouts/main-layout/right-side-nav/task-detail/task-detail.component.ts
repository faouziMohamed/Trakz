import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent {
  @Input() iconName: string = 'check';
  @Input() textClasses: string = '';
  @Input() iconClasses: string = '';
  @Input() text: string = 'Task Detail';

  constructor() {}

  @Input() onClose: () => void = () => {};

  @Input() onClick: () => void = () => {};
}
