import { Component, Input } from '@angular/core';
import { ITask } from '@models/task';

@Component({
  selector: 'app-opened-task',
  templateUrl: './opened-task.component.html',
  styleUrls: ['./opened-task.component.scss'],
})
export class OpenedTaskComponent {
  @Input() task: ITask | undefined;

  constructor() {}
}
