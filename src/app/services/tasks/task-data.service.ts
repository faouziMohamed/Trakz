import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ITask } from '@models/task';
import { MatSnackBar } from '@angular/material/snack-bar';

const TASKS: ITask[] = [
  {
    id: 1,
    text: 'Pay bills',
    dueDate: new Date('2022-12-01T15:00:00.000Z'),
    createdAt: new Date('2021-11-22T15:00:00.000Z'),
    isCompleted: false,
    parent: 'Tasks',
    isInMyDay: true,
    isImportant: false,
    steps: [
      {
        id: 1,
        text: 'Run to the bank',
        isCompleted: true,
      },
      {
        id: 2,
        text: 'Pay the bill',
        isCompleted: false,
      },
      {
        id: 3,
        text: 'Run back home',
        isCompleted: false,
      },
    ],
    recurrence: 'once',
    note: {
      text: '',
      lastEdited: null,
    },
  },
  {
    id: 2,
    text: 'Go to the gym',
    dueDate: new Date('2021-07-09T00:00:00.000Z'),
    createdAt: new Date('2021-05-09T00:00:00.000Z'),
    isCompleted: false,
    parent: 'Tasks',
    isInMyDay: false,
    isImportant: true,
    steps: [],
    recurrence: 'daily',
    note: {
      text: "Don't forget to bring your towel",
      lastEdited: new Date('2021-11-09T00:00:00.000Z'),
    },
  },
  {
    id: 3,
    text: "Finish all today's todo by 7 pm and all of the unfinished business should end before december 1st",
    dueDate: new Date('2021-07-01T15:00:00.000Z'),
    createdAt: new Date('2021-05-01T15:00:00.000Z'),
    isCompleted: false,
    parent: 'Tasks',
    isInMyDay: true,
    isImportant: false,
    steps: [
      {
        id: 1,
        text: 'Run to the bank',
        isCompleted: true,
      },
    ],
    recurrence: 'once',
    note: {
      text: '',
      lastEdited: null,
    },
  },
  {
    id: 4,
    text: 'Buy groceries',
    dueDate: new Date('2021-07-09T00:00:00.000Z'),
    createdAt: new Date('2021-05-09T20:10:00.000Z'),
    isCompleted: true,
    parent: 'Tasks',
    isInMyDay: false,
    isImportant: false,
    steps: [],
    recurrence: 'weekly',
    note: {
      text: 'Try to buy organic food and natural products',
      lastEdited: new Date('2021-07-09T00:00:00.000Z'),
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  private _tasks: BehaviorSubject<ITask[]> = new BehaviorSubject(TASKS);
  private _task: Subject<ITask> = new Subject();

  constructor(private _snackBar: MatSnackBar) {}

  getSelectedTask() {
    return this._task.asObservable();
  }

  setSelection(task: ITask) {
    this._task.next(task);
  }

  getTasks() {
    return this._tasks.asObservable();
  }

  addTask(task: ITask) {
    this._tasks.next([...this._tasks.value, task]);
    this._snackBar.open('1 Task added', 'Dismiss', {
      duration: 2000,
    });
  }

  removeTask(task: ITask) {
    this._tasks.next(this._tasks.value.filter((t) => t.id !== task.id));
    this._snackBar.open('Task with id ' + task.id + ' removed', 'Dismiss', {
      duration: 2000,
    });
  }

  updateTask(task: ITask) {
    this._task.next(task);
    this._snackBar.open(
      'Task with id ' + task.id + ' is just updated',
      'Dismiss',
      {
        duration: 2000,
      },
    );
  }

  draggedAndDroppedTask(task: ITask, newParent: string) {
    const updatedTask = { ...task, parent: newParent };
    this.updateTask(updatedTask);
  }

  compareTasks(task1: ITask, task2: ITask) {
    const task1String = JSON.stringify(task1);
    const task2String = JSON.stringify(task2);
    return task1.id === task2.id && task1String === task2String;
  }
}
