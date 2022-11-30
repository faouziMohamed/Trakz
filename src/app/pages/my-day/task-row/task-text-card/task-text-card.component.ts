import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '@models/task';

@Component({
  selector: 'app-task-text-card',
  templateUrl: './task-text-card.component.html',
  styleUrls: ['./task-text-card.component.scss'],
})
export class TaskTextCardComponent {
  @Input() task: ITask | undefined;

  @Input() textClassName: string | undefined = '';

  @Output() toggleTaskIsCompleted = new EventEmitter<ITask>();

  @Output() toggleTaskIsImportant = new EventEmitter<ITask>();

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

  showCompletedIcon(task: ITask) {
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

  onClickCompleteButton(task: ITask) {
    this.toggleTaskIsCompleted.emit(task);
  }

  onClickImportantButton(task: ITask) {
    this.toggleTaskIsImportant.emit(task);
  }
}
