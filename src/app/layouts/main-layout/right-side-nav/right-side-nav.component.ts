/* eslint-disable @typescript-eslint/no-non-null-assertion,no-param-reassign,class-methods-use-this */
import { Component, OnDestroy } from '@angular/core';
import { ITask, ITaskStep, TRecurrence } from '@models/task';
import { Subscription } from 'rxjs';

import { TaskService } from '@/services/tasks/task.service';
import {
  capitalizeFirstLetter,
  chooseDateToDisplay,
  isOverdue as isDateOverdue,
} from '@/utils/trakzUtils';

@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.scss'],
})
export class RightSideNavComponent implements OnDestroy {
  task: ITask | undefined;

  private readonly _taskObserver: Subscription | undefined;

  constructor(private _tasksService: TaskService) {
    this._taskObserver = this._tasksService
      .getSelectedTask()
      .subscribe((task) => {
        if (task) this.task = task;
      });
  }

  ngOnDestroy(): void {
    if (this._taskObserver) this._taskObserver.unsubscribe();
  }

  isOverdue(dueDate: Date) {
    return isDateOverdue(dueDate);
  }

  getTaskRecurrence(recurrence: TRecurrence) {
    return typeof recurrence === 'string'
      ? capitalizeFirstLetter(recurrence)
      : `Every ${recurrence.every} ${recurrence.unit}`;
  }

  onRightSidenavClose() {
    this._tasksService.setSelection(null);
    this.task = undefined;
  }

  toggleIsInMyDay() {
    return () => {
      const updatedTask = { ...this.task!, isInMyDay: !this.task!.isInMyDay };
      this._tasksService.updateTask(updatedTask);
      this._tasksService.setSelection(updatedTask);
    };
  }

  addStep(step: ITaskStep) {
    this._tasksService.addStep(this.task!, step);
  }

  onToggleStepComplete(id: ITaskStep['id']) {
    const step = this.task!.steps.find((s) => s.id === id);
    if (step) {
      step.isCompleted = !step.isCompleted;
      this._tasksService.updateStep(this.task!, step);
    }
  }

  onRemoveStep(id: ITaskStep['id']) {
    const step = this.task!.steps.find((s) => s.id === id);
    if (step) {
      this._tasksService.removeStep(this.task!, step);
    }
  }

  onPromoteStepToTask(id: ITaskStep['id']) {
    const step = this.task!.steps.find((s) => s.id === id);
    if (step) {
      this._tasksService.promoteStepToTask(this.task!, step);
    }
  }

  onToggleTaskIsCompleted(task: ITask) {
    this._tasksService.toggleTaskIsCompleted(task, true);
  }

  onToggleTaskIsImportant(task: ITask) {
    this._tasksService.toggleTaskIsImportant(task, true);
  }

  onDeleteTask(task: ITask) {
    this._tasksService.removeTask(task);
    this.onRightSidenavClose();
  }

  formatDate(dueDate: Date) {
    return chooseDateToDisplay(dueDate);
  }
}
