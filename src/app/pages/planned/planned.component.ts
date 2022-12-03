import { Component, OnInit } from '@angular/core';

import { PageTitles } from '@/models/navLabel';
import { ITask } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-planned',
  templateUrl: './planned.component.html',
  styleUrls: ['./planned.component.scss'],
})
export class PlannedComponent implements OnInit {
  tasks: ITask[] = [];

  constructor(private tasksData: TaskService) {}

  ngOnInit(): void {
    this.tasksData.getTaskByFolder(PageTitles.Planned).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
