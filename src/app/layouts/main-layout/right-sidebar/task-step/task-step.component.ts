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

  @Output() contentChange = new EventEmitter<
    Pick<TaskStep, 'content' | 'id'>
  >();

  @ViewChild(MatMenuTrigger)
  stepMenu: MatMenuTrigger | undefined;

  _editionStarted = false;

  constructor() {
    this.step = {} as TaskStep;
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

  onStepEditionEnded($event: KeyboardEvent) {
    // handle ctrl + enter to toggle step is complete
    if ($event.key !== 'Enter') {
      return;
    }
    $event.preventDefault();
    const newContent = ($event.target as HTMLInputElement).value;
    this.contentChange.emit({ content: newContent, id: this.step.id });
  }
}
