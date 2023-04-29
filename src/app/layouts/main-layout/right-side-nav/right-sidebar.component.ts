/* eslint-disable @typescript-eslint/no-non-null-assertion,no-param-reassign,class-methods-use-this */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ITask, Recurrence, TaskStep } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';
import {
  capitalizeFirstLetter,
  chooseDateToDisplay,
  isOverdue as isDateOverdue,
} from '@/utils/trakzUtils';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
})
export class RightSidebarComponent implements OnDestroy, OnInit {
  task: ITask | undefined;

  currentTaskId: string | undefined;

  private _taskObserver: Subscription | undefined;

  constructor(private _tasksService: TaskService) {}

  ngOnInit(): void {
    this._taskObserver = this._tasksService
      .getSelectedTask()
      .subscribe((task) => {
        if (task) {
          const taskId = TaskService.taskGeneratedId(task);
          // If clicked on the same task, close the right sidebar
          if (taskId === this.currentTaskId) {
            this.onRightSidebarClose();
            return;
          }
          this.task = task;
          this.currentTaskId = taskId;
        }
      });
  }

  ngOnDestroy(): void {
    if (this._taskObserver) this._taskObserver.unsubscribe();
  }

  isOverdue(dueDate: Date) {
    return isDateOverdue(dueDate);
  }

  getTaskRecurrence(recurrence: Recurrence) {
    return typeof recurrence === 'string'
      ? capitalizeFirstLetter(recurrence)
      : `Every ${recurrence.every} ${recurrence.unit}`;
  }

  onRightSidebarClose() {
    this._tasksService.setSelection(null);
    this.task = undefined;
    this.currentTaskId = undefined;
  }

  toggleIsInMyDay() {
    return () => {
      const updatedTask = { ...this.task!, isInMyDay: !this.task!.isInMyDay };
      this._tasksService.updateTask(updatedTask);
      this._tasksService.setSelection(updatedTask);
    };
  }

  addStep(step: TaskStep) {
    this._tasksService.addStep(this.task!, step);
  }

  onToggleStepComplete(id: TaskStep['id']) {
    const step = this.task!.steps.find((s) => s.id === id);
    if (step) {
      step.isCompleted = !step.isCompleted;
      this._tasksService.updateStep(this.task!, step);
    }
  }

  onRemoveStep(id: TaskStep['id']) {
    const step = this.task!.steps.find((s) => s.id === id);
    if (step) {
      this._tasksService.removeStep(this.task!, step);
    }
  }

  onPromoteStepToTask(id: TaskStep['id']) {
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
    this.onRightSidebarClose();
  }

  formatDate(dueDate: Date) {
    return chooseDateToDisplay(dueDate);
  }
}
