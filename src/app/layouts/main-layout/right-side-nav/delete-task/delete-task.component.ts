import { Component, Input } from '@angular/core';
import { ITask } from '@models/task';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss'],
})
export class DeleteTaskComponent {
  @Input() task: ITask | undefined;

  constructor() {}
}
