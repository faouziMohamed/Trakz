import { Component, OnInit } from '@angular/core';

import { pageTitles } from '@/models/navLabel';
import { ITask } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.scss'],
})
export class ImportantComponent implements OnInit {
  tasks: ITask[] = [];

  constructor(private tasksData: TaskService) {}

  ngOnInit(): void {
    this.tasksData.getTaskByFolder(pageTitles.Important).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
