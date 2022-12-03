import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ITask } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-opened-task',
  templateUrl: './opened-task.component.html',
  styleUrls: ['./opened-task.component.scss'],
})
export class OpenedTaskComponent {
  @Input() task!: ITask;

  @Output() toggleTaskIsComplete = new EventEmitter<ITask>();

  @Output() toggleTaskIsImportant = new EventEmitter<ITask>();

  constructor(private _taskService: TaskService) {}

  emitToggleTaskIsComplete() {
    this.toggleTaskIsComplete.emit(this.task);
  }

  emitToggleTaskIsImportant() {
    this.toggleTaskIsImportant.emit(this.task);
  }
}
