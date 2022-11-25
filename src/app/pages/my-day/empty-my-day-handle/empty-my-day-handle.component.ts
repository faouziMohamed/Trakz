import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-my-day-handle',
  templateUrl: './empty-my-day-handle.component.html',
  styleUrls: ['./empty-my-day-handle.component.scss'],
})
export class EmptyMyDayHandleComponent {
  @Input() show: boolean = false;

  constructor() {}
}
