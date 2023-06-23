import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from '@/models/task';

@Component({
  selector: 'app-task-text-card',
  templateUrl: './task-text-card.component.html',
  styleUrls: ['./task-text-card.component.scss'],
})
export class TaskTextCardComponent {
  @Input() task: Task | undefined;

  @Input() textClassName: string | undefined = '';

  @Output() toggleTaskIsCompleted = new EventEmitter<Task>();

  @Output() toggleTaskIsImportant = new EventEmitter<Task>();

  hasMouseOver = false;

  hasMouseOut = false;

  onMouseEnterCompletedIcon() {
    this.hasMouseOver = true;
    this.hasMouseOut = false;
  }

  onMouseLeaveCompletedIcon() {
    this.hasMouseOver = false;
    this.hasMouseOut = true;
  }

  showCompletedIcon(task: Task) {
    if (task.isCompleted) {
      return 'check_circle';
    }
    if (this.hasMouseOver) {
      return 'check_circle_outline';
    }
    if (this.hasMouseOut) {
      return 'radio_button_unchecked';
    }
    return 'radio_button_unchecked';
  }

  onClickCompleteButton(task: Task) {
    this.toggleTaskIsCompleted.emit(task);
  }

  onClickImportantButton(task: Task) {
    this.toggleTaskIsImportant.emit(task);
  }
}
