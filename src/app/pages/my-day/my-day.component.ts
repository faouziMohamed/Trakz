import { Component, OnInit } from '@angular/core';
import { ITask } from '@models/task';
import { TaskDataService } from '@/services/tasks/task-data.service';

@Component({
  selector: 'app-my-day',
  templateUrl: './my-day.component.html',
  styleUrls: ['./my-day.component.scss'],
})
export class MyDayComponent implements OnInit {
  tasks: ITask[] = [];
  constructor(private tasksData: TaskDataService) {}

  ngOnInit(): void {
    this.tasksData.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
