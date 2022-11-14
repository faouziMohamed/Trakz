import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trakz-logo',
  templateUrl: './trakz-logo.component.html',
  styleUrls: ['./trakz-logo.component.scss'],
})
export class TrakzLogoComponent implements OnInit {
  @Input() height: string | undefined;
  @Input() width: string | undefined;
  @Input() className: string | undefined;

  constructor() {}

  ngOnInit(): void {
    this.height = this.height || '100';
    this.width = this.width || '100';
  }
}
