import { Component, OnInit } from '@angular/core';

import { pageTitles } from '@/models/navLabel';
import { Task, TaskStatus } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  tasks: Task[] = [];

  tasksData: Record<TaskStatus, Task[]> = {} as Record<TaskStatus, Task[]>;

  folderName = '';

  toFilter = [TaskStatus.uncompleted, TaskStatus.completed];

  constructor(private _tasksService: TaskService) {}

  ngOnInit(): void {
    const filtered = this._tasksService.getTasksByStatus(
      this.toFilter,
      pageTitles.Projects,
    );
    this.toFilter.forEach((status) => {
      filtered[status].subscribe((tasksWithFolder) => {
        this.tasksData[status] = tasksWithFolder.tasks;
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
