/* eslint-disable @typescript-eslint/no-empty-function,class-methods-use-this */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent {
  @Input() iconName = 'check';

  @Input() textClasses = '';

  @Input() iconClasses = '';

  @Input() text = 'Task Detail';

  @Input() disabled = false;

  @Input() clearIconText = 'Clear';

  @Input() matMenu: MatMenu | null = null;

  // @Input() onClear = () => {};
  @Output() clear: EventEmitter<void> = new EventEmitter<void>();

  // @Input() onClick = () => {};
  @Output() detailClick: EventEmitter<void> = new EventEmitter<void>();

  onContainerClick($event: MouseEvent) {
    // ignore the click event on the button
    const btn = $event.target as HTMLElement;
    if (btn.classList.contains('mat-mdc-button-touch-target')) {
      return;
    }

    this.onClick();
  }

  onClearClick() {
    this.clear.emit();
  }

  onClick() {
    this.detailClick.emit();
  }
}
