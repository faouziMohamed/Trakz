import { CdkAccordionItem } from '@angular/cdk/accordion';
import { Component, Input } from '@angular/core';

import { ITask } from '@/models/task';

@Component({
  selector: 'app-task-group-list',
  templateUrl: './task-group-list.component.html',
  styleUrls: ['./task-group-list.component.scss'],
})
export class TaskGroupListComponent {
  @Input() tasks: ITask[] = [];

  @Input() open = true;

  @Input() title = '';

  @Input() accordionItem!: CdkAccordionItem;
}
