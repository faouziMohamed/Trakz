import { Component, OnInit } from '@angular/core';
import { ITask } from '@models/task';

import { TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: ITask[] = [];

  constructor(private tasksData: TaskService) {}

  ngOnInit(): void {
    this.tasksData.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
