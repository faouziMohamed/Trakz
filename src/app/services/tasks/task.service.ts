import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { PageTitles } from '@models/navLabel';
import { ITask, ITaskNote, ITaskStep, TRecurrence } from '@models/task';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

import { createHash } from '@/utils/trakzUtils';

const TASKS: ITask[] = [
  {
    id: 1,
    text: 'Pay bills',
    dueDate: new Date('2022-12-01T15:00:00.000Z'),
    createdAt: new Date('2021-11-22T15:00:00.000Z'),
    updatedAt: new Date('2021-11-22T15:00:00.000Z'),
    isCompleted: true,
    parent: 'Tasks',
    isInMyDay: true,
    isImportant: false,
    steps: [
      {
        id: 1,
        text: 'Run to the bank',
        isCompleted: true,
        createdAt: new Date('2021-11-22T15:00:00.000Z'),
        updatedAt: new Date('2021-11-22T15:00:00.000Z'),
      },
      {
        id: 2,
        text: 'Pay the bill',
        isCompleted: false,
        createdAt: new Date('2021-11-22T15:00:00.000Z'),
        updatedAt: new Date('2021-11-22T15:00:00.000Z'),
      },
      {
        id: 3,
        text: 'Run back home',
        isCompleted: false,
        createdAt: new Date('2021-11-22T15:00:00.000Z'),
        updatedAt: new Date('2021-11-22T15:00:00.000Z'),
      },
    ],
    recurrence: 'once',
    note: {
      text: '',
      createdAt: new Date('2021-11-22T15:00:00.000Z'),
      updatedAt: new Date('2021-11-22T15:00:00.000Z'),
    },
  },
  {
    id: 2,
    text: 'Go to the gym',
    dueDate: new Date('2021-07-09T00:00:00.000Z'),
    createdAt: new Date('2021-05-09T00:00:00.000Z'),
    updatedAt: new Date('2021-05-09T00:00:00.000Z'),
    isCompleted: false,
    parent: 'Tasks',
    isInMyDay: false,
    isImportant: true,
    steps: [],
    recurrence: 'daily',
    note: {
      text: "Don't forget to bring your towel",
      createdAt: new Date('2021-11-09T00:00:00.000Z'),
      updatedAt: new Date('2021-11-09T00:00:00.000Z'),
    },
  },
  {
    id: 3,
    text: "Finish all today's todo by 7 pm and all of the unfinished business should end before december 1st",
    dueDate: new Date('2021-07-01T15:00:00.000Z'),
    createdAt: new Date('2021-05-01T15:00:00.000Z'),
    updatedAt: new Date('2021-05-01T15:00:00.000Z'),
    isCompleted: false,
    parent: 'Tasks',
    isInMyDay: true,
    isImportant: false,
    steps: [
      {
        id: 1,
        text: 'Run to the bank',
        isCompleted: true,
        createdAt: new Date('2021-11-22T15:00:00.000Z'),
        updatedAt: new Date('2021-11-22T15:00:00.000Z'),
      },
    ],
    recurrence: 'once',
    note: {
      text: '',
      createdAt: new Date('2021-11-22T15:00:00.000Z'),
      updatedAt: new Date('2021-11-22T15:00:00.000Z'),
    },
  },
  {
    id: 4,
    text: 'Buy groceries',
    dueDate: new Date('2021-07-09T00:00:00.000Z'),
    createdAt: new Date('2021-05-09T20:10:00.000Z'),
    updatedAt: new Date('2021-05-09T20:10:00.000Z'),
    isCompleted: true,
    parent: 'Tasks',
    isInMyDay: false,
    isImportant: false,
    steps: [],
    recurrence: 'weekly',
    note: {
      text: 'Try to buy organic food and natural products',
      createdAt: new Date('2021-07-09T00:00:00.000Z'),
      updatedAt: new Date('2021-07-09T00:00:00.000Z'),
    },
  },
  {
    id: 5,
    text: 'Buy groceries and try to get new shoes with a discount, when not possible, buy them at full price',
    dueDate: new Date('2022-11-26T14:00:00.000Z'),
    createdAt: new Date('2022-11-25T20:10:00.000Z'),
    updatedAt: new Date('2022-11-25T20:10:00.000Z'),
    isCompleted: false,
    parent: 'Tasks',
    isInMyDay: true,
    isImportant: true,
    steps: [],
    recurrence: 'weekly',
    note: {
      text: 'Try to buy organic food and natural products',
      createdAt: new Date('2021-07-09T00:00:00.000Z'),
      updatedAt: new Date('2021-07-09T00:00:00.000Z'),
    },
  },
];

export interface CreateTaskProps {
  text: string;
  parent?: string;
  isInMyDay?: boolean;
  isImportant?: boolean;
  steps?: ITaskStep[];
  recurrence?: TRecurrence;
  note?: ITaskNote;
  dueDate?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly tasksStorageKey = 't-tasks';

  readonly tasksHashKey = 't-tasks-hash';

  private _tasks = new BehaviorSubject<ITask[]>([] as ITask[]);

  private _task = new Subject<ITask | null>();

  private filteredTasks = new BehaviorSubject<ITask[]>([]);

  constructor(private _snackBar: MatSnackBar) {
    const tasks = this.loadTasksFromLocalStorage() ?? '[]';
    this._tasks = new BehaviorSubject(JSON.parse(tasks) as ITask[]);
  }

  static toDateString = (date: Date): string =>
    date
      .toString()
      .replace(/[.:a-zA-Z]/g, '')
      .replace(/ /g, '')
      .replace(/-/g, '');

  static sortTasks = (a: ITask, b: ITask): number => a.id - b.id;

  static taskGeneratedId = (task: ITask): string =>
    `${task.id}${TaskService.toDateString(
      task.createdAt,
    )}${TaskService.toDateString(task.updatedAt)}${task.parent}`;

  private static filterPredicate = (folder: string) => {
    if (folder === PageTitles.Planned) {
      return (task: ITask) => !!task.dueDate;
    }
    if (folder === PageTitles.MyDay) {
      return (task: ITask) => task.isInMyDay;
    }
    if (folder === PageTitles.Important) {
      return (task: ITask) => task.isImportant;
    }
    return (task: ITask) => task.parent === folder;
  };

  createTask(props: CreateTaskProps): ITask {
    const { text, parent: p } = props;
    let { isInMyDay, isImportant, dueDate, recurrence } = props;
    const { steps, note } = props;
    let parent = p ?? PageTitles.Tasks;
    if (
      p === PageTitles.MyDay ||
      p === PageTitles.Important ||
      p === PageTitles.Planned
    ) {
      parent = PageTitles.Tasks;
    }

    if (p === PageTitles.Important) {
      isImportant = true;
    }
    if (p === PageTitles.MyDay) {
      isInMyDay = true;
    }

    if (p === PageTitles.Planned) {
      dueDate = new Date();
      recurrence = 'once';
    }

    return {
      id: this._tasks.value.length + 1,
      text,
      parent,
      dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      isCompleted: false,
      isInMyDay: isInMyDay ?? false,
      isImportant: isImportant ?? false,
      steps: steps ?? [],
      recurrence: recurrence ?? 'once',
      note: note ?? { text: '' },
    };
  }

  getSelectedTask() {
    return this._task.asObservable();
  }

  setSelection(task: ITask | null) {
    this._task.next(task);
  }

  getTaskByFolder(folder?: PageTitles): Observable<ITask[]> {
    this.getTasks().subscribe((tasks) => {
      if (folder) {
        this.filteredTasks.next(
          tasks.filter(TaskService.filterPredicate(folder)),
        );
      } else {
        this.filteredTasks.next(tasks);
      }
    });

    return this.filteredTasks.asObservable();
  }

  getTasks(callback?: () => void): Observable<ITask[]> {
    fromPromise(createHash(JSON.stringify(TASKS))).subscribe((hash) => {
      const hashFromStorage = localStorage.getItem(this.tasksHashKey);
      if (hashFromStorage && hashFromStorage !== hash) {
        this._tasks.next(this._tasks.value.sort(TaskService.sortTasks));
      } else {
        this._tasks.next(TASKS.sort(TaskService.sortTasks));
      }
      this.saveTasksToLocalStorage();
      if (callback) {
        callback();
      }
    });
    return this._tasks.asObservable();
  }

  saveTasksToLocalStorage() {
    localStorage.setItem(
      this.tasksStorageKey,
      JSON.stringify(this._tasks.value),
    );

    // create hash of the tasks and save it to local storage
    createHash(JSON.stringify(this._tasks.value))
      .then((hash: string) => {
        localStorage.setItem(this.tasksHashKey, hash);
        return hash;
      })
      .catch(() =>
        this._snackBar.open('caching failed', 'close', { duration: 2000 }),
      );
  }

  loadTasksFromLocalStorage() {
    return localStorage.getItem(this.tasksStorageKey);
  }

  // remove all tasks from local storage
  clearTasksFromLocalStorage() {
    localStorage.removeItem(this.tasksStorageKey);
    localStorage.removeItem(this.tasksHashKey);
    this._tasks.next([]);
  }

  addTask(task: ITask) {
    const newTask = { ...task };
    if (!newTask.id) {
      newTask.id = this._tasks.value.length + 1;
    }
    this._tasks.next(
      [...this._tasks.value, newTask].sort(TaskService.sortTasks),
    );
    this.saveTasksToLocalStorage();
    this._snackBar.open('Task added successfully', 'Dismiss', {
      duration: 2000,
    });
  }

  removeTask(task: ITask) {
    const tasks = this._tasks.value.filter((t) => t.id !== task.id);
    this._tasks.next(tasks);
    this.saveTasksToLocalStorage();
    this._snackBar.open('Task removed successfully', 'Dismiss', {
      duration: 2000,
    });
  }

  updateTask(task: ITask) {
    const filteredTasks = this._tasks.value.filter((t) => t.id !== task.id);
    this._tasks.next([...filteredTasks, task].sort(TaskService.sortTasks));
    this.saveTasksToLocalStorage();
  }

  addStep(task: ITask, step: ITaskStep) {
    const newStep = { ...step };
    if (step.id === 0) newStep.id = task.steps.length || 1;
    task.steps.push(newStep);
    this.updateTask(task);
  }

  updateStep(task: ITask, step: ITaskStep) {
    const steps = task.steps.map((s) => (s.id === step.id ? step : s));
    this.updateTask({ ...task, steps });
  }

  removeStep(task: ITask, step: ITaskStep) {
    const steps = task.steps.filter((s) => s.id !== step.id);
    this.updateTask({ ...task, steps });
  }

  toggleTaskIsCompleted(task: ITask, isSelected = false) {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    if (isSelected) this.setSelection(updatedTask);
    this.updateTask(updatedTask);
    return updatedTask;
  }

  toggleTaskIsImportant(task: ITask, isSelected = false) {
    const updatedTask = { ...task, isImportant: !task.isImportant };
    if (isSelected) this.setSelection(updatedTask);
    this.updateTask(updatedTask);
    return updatedTask;
  }

  updateTaskNote(task: ITask, note: ITaskNote) {
    const updatedTask = { ...task, note };
    this.updateTask(updatedTask);
    return updatedTask;
  }

  updateTaskRecurrence(task: ITask, recurrence: TRecurrence) {
    const updatedTask = { ...task, recurrence };
    this.updateTask(updatedTask);
    return updatedTask;
  }

  updateTaskDueDate(task: ITask, dueDate: Date) {
    const updatedTask = { ...task, dueDate };
    this.updateTask(updatedTask);
    return updatedTask;
  }

  promoteStepToTask(task: ITask, step: ITaskStep) {
    const newTask = this.stepToTask(step, task);
    this.removeStep(task, step);
    this.addTask(newTask);
    this.updateTask(task);
    this._snackBar.open(
      `Step with id ${step.id} is promoted to a task`,
      'Dismiss',
      { duration: 3000 },
    );
  }

  countTasks(folder?: PageTitles): number {
    if (folder) {
      return this._tasks.value.filter(TaskService.filterPredicate(folder))
        .length;
    }
    return this._tasks.value.length;
  }

  private stepToTask(step: ITaskStep, task: ITask): ITask {
    return {
      id: this._tasks.value.length + 1,
      text: step.text,
      parent: task.parent,
      isCompleted: step.isCompleted,
      isImportant: false,
      isInMyDay: false,
      recurrence: 'once',
      createdAt: step.createdAt,
      updatedAt: step.updatedAt,
      steps: [],
      note: {
        text: '',
        createdAt: step.createdAt,
        updatedAt: step.updatedAt,
      },
    };
  }
}
