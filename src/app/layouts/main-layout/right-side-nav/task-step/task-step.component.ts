import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

import { TaskStep } from '@/models/task';

export interface IToggleComplete {
  id: TaskStep['id'];
}

@Component({
  selector: 'app-task-step',
  templateUrl: './task-step.component.html',
  styleUrls: ['./task-step.component.scss'],
})
export class TaskStepComponent {
  hasMouseOver = false;

  hasMouseOut = false;

  @Input() step!: TaskStep;

  @Output() removeStep = new EventEmitter<TaskStep['id']>();

  @Output() promoteStepToTask = new EventEmitter<TaskStep['id']>();

  @Output() toggleStepIsComplete = new EventEmitter<TaskStep['id']>();

  @ViewChild(MatMenuTrigger)
  stepMenu: MatMenuTrigger | undefined;

  constructor() {
    this.step = {} as TaskStep;
  }

  showCompletedIcon(step: TaskStep) {
    if (step.isCompleted) {
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

  onMouseEnterCompletedIcon() {
    this.hasMouseOver = true;
    this.hasMouseOut = false;
  }

  onMouseLeaveCompletedIcon() {
    this.hasMouseOver = false;
    this.hasMouseOut = true;
  }

  emitToggleStepIsComplete(step: TaskStep) {
    this.toggleStepIsComplete.emit(step.id);
  }

  emitPromoteStepToTask(step: TaskStep) {
    this.promoteStepToTask.emit(step.id);
  }

  emitRemoveStep(step: TaskStep) {
    this.removeStep.emit(step.id);
  }

  onRightClickInTheStep($event: MouseEvent) {
    $event.preventDefault();
    if (this.stepMenu) {
      this.stepMenu.openMenu();
    }
  }
}
