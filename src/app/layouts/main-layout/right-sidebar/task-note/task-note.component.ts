import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

import { Task } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';
import { passedTimeFormatted } from '@/utils/trakzUtils';

@Component({
  selector: 'app-task-note',
  templateUrl: './task-note.component.html',
  styleUrls: ['./task-note.component.scss'],
})
export class TaskNoteComponent implements OnInit {
  @Input() task: Task = {} as Task;

  withRefresh = false;

  isTaskBeingUpdate = false;

  private typedNoteText$ = new Subject<string>();

  constructor(private _tasksService: TaskService) {}

  ngOnInit() {
    this.typedNoteText$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((content) => {
          this.task.note.content = content;
          this.isTaskBeingUpdate = true;
          return this._tasksService.updateTask(this.task);
        }),
      )
      .subscribe((task) => {
        this.task = task;
        this.isTaskBeingUpdate = false;
      });
  }

  onUserTyping(event: Event) {
    const content = (event.target as HTMLTextAreaElement).value;
    this.typedNoteText$.next(content);
  }

  getLastUpdateDate() {
    return passedTimeFormatted(this.task.note.updatedAt);
  }
}
