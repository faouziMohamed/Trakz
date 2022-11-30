import { Component, OnInit } from '@angular/core';
import { PageTitles } from '@models/navLabel';
import { ITask } from '@models/task';

import { TaskService } from '@/services/tasks/task.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  tasks: ITask[] = [];

  constructor(private tasksData: TaskService) {}

  ngOnInit(): void {
    this.tasksData.getTaskByFolder(PageTitles.Projects).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
