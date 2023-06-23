import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-opened-task',
  templateUrl: './opened-task.component.html',
  styleUrls: ['./opened-task.component.scss'],
})
export class OpenedTaskComponent {
  @Input() task!: Task;

  @Output() toggleTaskIsComplete = new EventEmitter<Task>();

  @Output() toggleTaskIsImportant = new EventEmitter<Task>();

  @Output() contentChanged = new EventEmitter<string>();

  _editionStarted = false;

  constructor(private _taskService: TaskService) {}

  emitToggleTaskIsComplete() {
    this.toggleTaskIsComplete.emit(this.task);
  }

  emitToggleTaskIsImportant() {
    this.toggleTaskIsImportant.emit(this.task);
  }

  setEditionStarted(inputId: string | number) {
    this._editionStarted = true;
    setTimeout(() => {
      const input = document.getElementById(
        inputId.toString(),
      ) as HTMLInputElement | null;
      if (input) {
        input.focus();
        input.selectionStart = input.value.length;
        input.selectionEnd = input.value.length;
      }
    }, 0);
  }

  setEditionEnded() {
    this._editionStarted = false;
  }

  onTaskEditionEnded($event: KeyboardEvent) {
    if ($event.key !== 'Enter') {
      return;
    }
    $event.preventDefault();
    const newContent = ($event.target as HTMLInputElement).value;
    this.contentChanged.emit(newContent);
  }
}
