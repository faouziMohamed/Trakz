/* eslint-disable class-methods-use-this */
import { Component, Input, OnInit } from '@angular/core';

import { Task, TaskStep } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';
import {
  chooseDateToDisplay,
  isOverdue as isDateOverdue,
  isToday as isDateToday,
  taskGeneratedId,
} from '@/utils/trakzUtils';

@Component({
  selector: 'app-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
})
export class TaskRowComponent implements OnInit {
  @Input() task: Task | undefined;

  @Input() folderName = '';

  constructor(private _tasksService: TaskService) {}

  // eslint-disable-next-line class-methods-use-this
  countCompletedSteps(steps: TaskStep[]) {
    return steps.filter((step) => step.isCompleted).length;
  }

  ngOnInit(): void {
    this.task = this.task ?? ({} as Task);
  }

  isOverdue = (dueDate: Date) => isDateOverdue(dueDate);

  isToday = (dueDate: Date) => isDateToday(dueDate);

  onClickOnTaskRow($event: MouseEvent, task: Task) {
    const target = $event.target as HTMLElement;
    // ignore click on buttons and icons inside the task row
    if (target.tagName === 'BUTTON' || target.tagName === 'MAT-ICON') {
      return;
    }
    this._tasksService.setSelectedTask(task);
  }

  onToggleTaskIsCompleted(task: Task) {
    this._tasksService.toggleTaskIsCompleted(task);
  }

  onToggleTaskIsImportant(task: Task) {
    this._tasksService.toggleTaskIsImportant(task);
  }

  taskGeneratedId = (task: Task) => taskGeneratedId(task);

  formatDate = (dueDate: Date) => chooseDateToDisplay(dueDate);
}
