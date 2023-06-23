import { Component, OnInit } from '@angular/core';

import { pageTitles } from '@/models/navLabel';
import { Task } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-my-day',
  templateUrl: './my-day.component.html',
  styleUrls: ['./my-day.component.scss'],
})
export class MyDayComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private tasksData: TaskService) {}

  ngOnInit(): void {
    this.tasksData //
      .getTaskByFolder(pageTitles.MyDay) //
      .subscribe((folderNameWithTasks) => {
        this.tasks = folderNameWithTasks.tasks;
      });
  }
}
