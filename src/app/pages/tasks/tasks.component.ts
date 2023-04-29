import { Component, OnInit } from '@angular/core';

import { pageTitles } from '@/models/navLabel';
import { ITask, TaskStatus } from '@/models/task';
import { FilteredByStatus, TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: ITask[] = [];

  tasksData: Record<TaskStatus, ITask[]> = {} as Record<TaskStatus, ITask[]>;

  toFilter = [TaskStatus.uncompleted, TaskStatus.completed];

  constructor(private _tasksService: TaskService) {}

  ngOnInit(): void {
    this._tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });

    const filtered = this._tasksService.getTasksByStatus(
      this.toFilter,
      pageTitles.Tasks,
    ) as FilteredByStatus;

    this.toFilter.forEach((status) => {
      filtered[status].subscribe((tasks) => {
        this.tasksData[status] = tasks;
      });
    });
  }

  getUncompleted() {
    return this.tasksData[TaskStatus.uncompleted];
  }

  getCompleted() {
    return this.tasksData[TaskStatus.completed];
  }
}
