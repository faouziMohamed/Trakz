import { Component, OnInit } from '@angular/core';

import { pageTitles } from '@/models/navLabel';
import { Task } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-planned',
  templateUrl: './planned.component.html',
  styleUrls: ['./planned.component.scss'],
})
export class PlannedComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private tasksData: TaskService) {}

  ngOnInit(): void {
    this.tasksData //
      .getTaskByFolder(pageTitles.Planned) //
      .subscribe((folderNameWithTasks) => {
        this.tasks = folderNameWithTasks.tasks;
      });
  }
}
