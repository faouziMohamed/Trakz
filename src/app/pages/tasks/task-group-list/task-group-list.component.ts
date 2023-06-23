import { CdkAccordionItem } from '@angular/cdk/accordion';
import { Component, Input } from '@angular/core';

import { Task } from '@/models/task';

@Component({
  selector: 'app-task-group-list',
  templateUrl: './task-group-list.component.html',
  styleUrls: ['./task-group-list.component.scss'],
})
export class TaskGroupListComponent {
  @Input() tasks: Task[] = [];

  @Input() open = true;

  @Input() title = '';

  @Input() folderName = '';

  @Input() accordionItem!: CdkAccordionItem;
}
