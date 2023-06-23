import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-calendar',
  templateUrl: './empty-calendar.component.html',
  styleUrls: ['./empty-calendar.component.scss'],
})
export class EmptyCalendarComponent implements OnInit {
  @Input() height: string | undefined;

  @Input() width: string | undefined;

  @Input() className: string | undefined;

  ngOnInit(): void {
    this.height = this.height ?? '100';
    this.width = this.width ?? '100';
  }
}
