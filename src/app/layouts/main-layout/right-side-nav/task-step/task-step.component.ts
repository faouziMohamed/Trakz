import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatLegacyMenuTrigger as MatMenuTrigger } from '@angular/material/legacy-menu';
import { ITaskStep } from '@models/task';

export interface IToggleComplete {
  id: ITaskStep['id'];
}

@Component({
  selector: 'app-task-step',
  templateUrl: './task-step.component.html',
  styleUrls: ['./task-step.component.scss'],
})
export class TaskStepComponent {
  hasMouseOver = false;

  hasMouseOut = false;

  @Input() step!: ITaskStep;

  @Output() removeStep = new EventEmitter<ITaskStep['id']>();

  @Output() promoteStepToTask = new EventEmitter<ITaskStep['id']>();

  @Output() toggleStepIsComplete = new EventEmitter<ITaskStep['id']>();

  @ViewChild(MatMenuTrigger)
  stepMenu: MatMenuTrigger | undefined;

  constructor() {
    this.step = {} as ITaskStep;
  }

  showCompletedIcon(step: ITaskStep) {
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

  emitToggleStepIsComplete(step: ITaskStep) {
    this.toggleStepIsComplete.emit(step.id);
  }

  emitPromoteStepToTask(step: ITaskStep) {
    this.promoteStepToTask.emit(step.id);
  }

  emitRemoveStep(step: ITaskStep) {
    this.removeStep.emit(step.id);
  }

  onRightClickInTheStep($event: MouseEvent) {
    $event.preventDefault();
    if (this.stepMenu) {
      this.stepMenu.openMenu();
    }
  }
}
