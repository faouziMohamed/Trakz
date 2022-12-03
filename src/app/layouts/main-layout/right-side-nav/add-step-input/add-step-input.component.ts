/* eslint-disable no-param-reassign */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ITask, ITaskStep } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-add-step-input',
  templateUrl: './add-step-input.component.html',
  styleUrls: ['./add-step-input.component.scss'],
})
export class AddStepInputComponent implements OnInit {
  inputHasFocus = false;

  @Output() addStep: EventEmitter<ITaskStep> = new EventEmitter<ITaskStep>();

  @Output() taskChange = new EventEmitter<ITask>();

  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    this.inputHasFocus = false;
  }

  onInputFocus(taskInput: HTMLInputElement) {
    if (!taskInput.value) {
      taskInput.placeholder = '';
    }
    this.inputHasFocus = true;
  }

  onInputBlur(taskInput: HTMLInputElement) {
    if (!taskInput.value) {
      taskInput.placeholder = 'Next step';
    }
    this.inputHasFocus = false;
  }

  emitAddStep(taskInput: HTMLInputElement) {
    if (taskInput.value.trim()) {
      const step: ITaskStep = {
        id: 0,
        text: taskInput.value.trim(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.addStep.emit(step);
      taskInput.value = '';
    }
  }
}
