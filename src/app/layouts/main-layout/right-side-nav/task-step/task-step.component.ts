import { Component, Input, ViewChild } from '@angular/core';
import { ITaskStep } from '@models/task';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-task-step',
  templateUrl: './task-step.component.html',
  styleUrls: ['./task-step.component.scss'],
})
export class TaskStepComponent {
  hasMouseOver: boolean = false;
  hasMouseOut: boolean = false;
  @Input() step: ITaskStep | undefined;
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

  handleCompletedIconMouseEnter() {
    this.hasMouseOver = true;
    this.hasMouseOut = false;
  }

  handleCompletedIconMouseLeave() {
    this.hasMouseOver = false;
    this.hasMouseOut = true;
  }

  handleMarkAsComplete(step: ITaskStep) {}

  handlePromoteToTask(step: ITaskStep) {}

  handleDeleteStep(step: ITaskStep) {}

  onRightClick($event: MouseEvent) {
    $event.preventDefault();
    this.stepMenu?.openMenu();
  }
}
