/* eslint-disable @typescript-eslint/no-non-null-assertion,no-param-reassign,class-methods-use-this */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recurrence, Task, TaskStep } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterOfEachWord,
  chooseDateToDisplay,
  isOverdue as isDateOverdue,
  isOverdue,
  taskGeneratedId,
} from '@/utils/trakzUtils';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
})
export class RightSidebarComponent implements OnDestroy, OnInit {
  task: Task | undefined;

  currentTaskId: string | undefined;

  protected readonly Date = Date;

  protected readonly capitalizeFirstLetter = capitalizeFirstLetter;

  protected readonly capitalizeFirstLetterOfEachWord =
    capitalizeFirstLetterOfEachWord;

  private _taskObserver: Subscription | undefined;

  constructor(private _tasksService: TaskService) {}

  dayFromToday(day: 'today' | 'tomorrow' | 'next week') {
    // the returned string is the short of the day name. Ex: 'Mon', 'Tue', 'Wed', etc.
    const format = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

    const today = new Date();
    if (day === 'today') {
      return capitalizeFirstLetter(format.format(today));
    }
    if (day === 'tomorrow') {
      const date = new Date(today.setDate(today.getDate() + 1));
      return capitalizeFirstLetter(format.format(date));
    }
    // the next monday
    const date = new Date(
      today.setDate(today.getDate() + ((7 - today.getDay()) % 7) + 1),
    );
    return capitalizeFirstLetter(format.format(date));
  }

  ngOnInit(): void {
    this._taskObserver = this._tasksService
      .getSelectedTask()
      .subscribe((task) => {
        if (task) {
          const taskId = taskGeneratedId(task);
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
    this._tasksService.setSelectedTask(null);
    this.task = undefined;
    this.currentTaskId = undefined;
  }

  toggleIsInMyDay() {
    return () => {
      if (!this.task) return;
      this.task.isInMyDay = !this.task.isInMyDay;
      this.triggerCacheAndServerUpdate();
    };
  }

  addStep(step: TaskStep) {
    this._tasksService.addStep(this.task!, step);
  }

  onStepContentChange($event: { id: number; content: string }) {
    const step = this.task!.steps.find((s) => s.id === $event.id);
    if (step) {
      step.content = $event.content;
      this._tasksService.updateStep(this.task!, step);
    }
  }

  onTaskContentChange(newContent: string) {
    if (!this.task) return;
    this.task.content = newContent;
    this.triggerCacheAndServerUpdate();
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

  onToggleTaskIsCompleted(task: Task) {
    this._tasksService.toggleTaskIsCompleted(task, true);
  }

  onToggleTaskIsImportant(task: Task) {
    this._tasksService.toggleTaskIsImportant(task, true);
  }

  onDeleteTask(task: Task) {
    this._tasksService.removeTask(task);
    this.onRightSidebarClose();
  }

  formatDate(dueDate: Date) {
    return chooseDateToDisplay(dueDate);
  }

  getTaskDueDateClasses(
    dueDate: Date | undefined | null,
    checkIncludeRecurence = false,
  ) {
    if (!dueDate) return 'text-gray-500 hover:text-gray-500';

    if (!checkIncludeRecurence) {
      return isOverdue(dueDate) ? 'text-red-600' : 'text-cyan-600';
    }
    return this.task!.recurrence ? 'text-cyan-600' : 'text-gray-500';
  }

  setToDayAsDueDate() {
    if (!this.task) return;
    this.task.dueDate = new Date();
    this.triggerCacheAndServerUpdate();
  }

  setToTomorrowAsDueDate() {
    if (!this.task) return;
    const today = new Date();
    // noinspection UnnecessaryLocalVariableJS
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    this.task.dueDate = tomorrow;
    this.triggerCacheAndServerUpdate();
  }

  setNextMondayAsDueDate() {
    if (!this.task) return;
    const today = new Date();
    const remainingDays = 7 - today.getDay();
    // noinspection UnnecessaryLocalVariableJS
    const nextMonday = new Date(
      today.setDate(today.getDate() + remainingDays + 1),
    );
    this.task.dueDate = nextMonday;
    this.triggerCacheAndServerUpdate();
  }

  setRecurrence(recurrence: Recurrence) {
    if (!this.task) return;
    this.task.recurrence = recurrence;
    this.triggerCacheAndServerUpdate();
  }

  private triggerCacheAndServerUpdate() {
    this._tasksService
      .updateTask(this.task!) //
      .subscribe((task) => {
        this.task = task;
      });
  }
}
