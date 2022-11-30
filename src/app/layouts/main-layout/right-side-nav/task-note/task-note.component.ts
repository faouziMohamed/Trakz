import { Component, Input } from '@angular/core';
import { ITaskNote } from '@models/task';

@Component({
  selector: 'app-task-note',
  templateUrl: './task-note.component.html',
  styleUrls: ['./task-note.component.scss'],
})
export class TaskNoteComponent {
  @Input() note: ITaskNote | undefined;
}
