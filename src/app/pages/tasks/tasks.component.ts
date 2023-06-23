import { Component, OnInit } from '@angular/core';

import { pageTitles } from '@/models/navLabel';
import { DEFAULT_FOLDER, Task, TaskStatus } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  tasksData: Record<TaskStatus, Task[]> = {} as Record<TaskStatus, Task[]>;

  toFilter = [TaskStatus.uncompleted, TaskStatus.completed];

  folderName = DEFAULT_FOLDER.Tasks;

  constructor(private _tasksService: TaskService) {}

  ngOnInit(): void {
    const filtered = this._tasksService.getTasksByStatus(
      this.toFilter,
      pageTitles.Tasks,
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
