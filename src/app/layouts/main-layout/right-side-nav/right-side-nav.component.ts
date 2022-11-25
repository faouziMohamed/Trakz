import { Component } from '@angular/core';
import { TaskDataService } from '@/services/tasks/task-data.service';
import { ITask, TRecurrence } from '@models/task';

@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.scss'],
})
export class RightSideNavComponent {
  task: ITask;

  constructor(private _tasksData: TaskDataService) {
    // this._tasksData.getSelectedTask().subscribe((task) => {
    this.task = {
      id: 3,
      text: "Finish all today's todo by 7 pm ",
      dueDate: new Date('2021-10-01T15:00:00.000Z'),
      isCompleted: false,
      parent: 'Tasks',
      isInMyDay: true,
      isImportant: true,
      createdAt: new Date('2021-07-01T15:00:00.000Z'),
      steps: [
        {
          id: 1,
          text: 'Run to the bank',
          isCompleted: true,
        },
        {
          id: 2,
          text: 'Buy groceries',
          isCompleted: false,
        },
      ],
      recurrence: {
        every: 2,
        unit: 'days',
      },
      note: {
        text: 'Something to remember about this task',
        lastEdited: new Date('2021-11-01T15:00:00.000Z'),
      },
    }; //task;
    // });
  }

  isDueDatePassed(dueDate: Date) {
    return dueDate < new Date();
  }

  getTaskRecurrence(recurrence: TRecurrence) {
    return typeof recurrence === 'string'
      ? this.capitalizeFirstLetter(recurrence)
      : `Every ${recurrence.every} ${recurrence.unit}`;
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
