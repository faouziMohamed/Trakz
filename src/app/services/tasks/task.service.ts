import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  throwError,
} from 'rxjs';

import { CustomResponse } from '@/models/dto/custom-response';
import { PageTitles } from '@/models/navLabel';
import {
  DEFAULT_FOLDER,
  Folder,
  Recurrence,
  Task,
  TaskNote,
  TaskStatus,
  TaskStep,
  TasksWithFolder,
} from '@/models/task';
import {
  createHash,
  filterByStatusPredicate,
  filterFolderPredicate,
  getFlatTasks,
  isFolderExists,
  sortTasks,
} from '@/utils/trakzUtils';

import { environment } from '../../../environments/environment';

export interface CreateTaskProps {
  content: string;
  folderName?: string;
  isInMyDay?: boolean;
  isImportant?: boolean;
  steps?: TaskStep[];
  recurrence?: Recurrence;
  note?: TaskNote;
  dueDate?: Date;
}

export interface SaveTaskToServerDto {
  content: string;
  folderName?: string;
  isInMyDay?: boolean;
  isImportant?: boolean;
  dueDate?: Date;
  note?: TaskNote;
  steps?: TaskStep[];
}

export type FilteredByStatus = Record<TaskStatus, Observable<TasksWithFolder>>;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly tasksStorageKey = 't-tasks';

  readonly tasksHashKey = 't-tasks-hash';

  private _selectedTask = new Subject<Task | null>();

  private apiUrl = `${
    environment.BACKEND_URL || 'http://localhost:8080'
  }/api/v1`;

  /**
   * Holds the tasks grouped by folder name as an observable.
   * This is the main observable that stores the tasks coming from the server.
   * @private _tasksByFolder$
   */
  private _tasksByFolder$ = new BehaviorSubject<Record<string, Task[]>>({});

  /**
   * Holds all the tasks ungrouped as an observable.
   * This will be updated whenever the {@link _tasksByFolder$} observable changes.
   * @private
   */
  private _flatTasks$ = new BehaviorSubject<Task[]>([] as Task[]);

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) {
    const taskFromSt = this._loadTasksFromLocalStorage() ?? '[]';
    this._flatTasks$ = new BehaviorSubject(JSON.parse(taskFromSt) as Task[]);
    this._flatTasks$.subscribe(() => this._saveTasksToLocalStorage());

    this._tasksByFolder$.subscribe((tasksByFolder) => {
      const flatTasks = getFlatTasks(tasksByFolder);
      this._flatTasks$.next(flatTasks);
    });

    this._fetchFoldersWithTasks$();

    this._router.events.subscribe(($event) => {
      if (!($event instanceof NavigationEnd)) return;
      const { url: u } = $event;
      const url = u === '/' ? '/my-day' : u;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const page = url.split('/')[1];
      this._fetchFoldersWithTasks$();
      this.setSelectedTask(null);
    });
  }

  getSelectedTask() {
    return this._selectedTask.asObservable();
  }

  setSelectedTask(task: Task | null) {
    this._selectedTask.next(task);
  }

  /**
   * Fetch folders with tasks from the server
   * @param folderName
   */
  getTaskByFolder(
    folderName: PageTitles | string = DEFAULT_FOLDER.Tasks,
  ): Observable<TasksWithFolder> {
    return this._tasksByFolder$.pipe(
      map((tasksByFolder) => {
        let tasks = tasksByFolder[folderName.toLowerCase()];
        if (!isFolderExists(folderName, tasksByFolder)) {
          this._flatTasks$.subscribe((tasksFromObs) => {
            tasks = tasksFromObs.filter(filterFolderPredicate(folderName));
          });
        }
        return { tasks, folderName };
      }),
    );
  }

  getTasksByStatus(status: TaskStatus | TaskStatus[], folder: PageTitles) {
    // Get tasks by status from the folder one by one and return an object
    if (Array.isArray(status)) {
      const filteredTasks: FilteredByStatus = {} as FilteredByStatus;
      status.forEach((taskStatus) => {
        const got = this.getTasksByStatus(taskStatus, folder);
        filteredTasks[taskStatus] = got[taskStatus];
      });
      return filteredTasks;
    }

    // Get tasks by status from the folder and return an object
    const filtered$ = this.getTaskByFolder(folder) //
      .pipe(
        map(({ tasks: ts, folderName: fName }) => {
          const filteredTasks = ts.filter(filterByStatusPredicate(status));
          return { tasks: filteredTasks, folderName: fName } as TasksWithFolder;
        }),
      );
    return { [status]: filtered$ } as FilteredByStatus;
  }

  addNewTask(props: CreateTaskProps) {
    const createdTask = this._addNewTask(props);
    return this._saveTask(createdTask);
  }

  updateTask(task: Task, updateServer = true) {
    const folderName = task.folderName.toLowerCase();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const folderTasks = this._tasksByFolder$.value[folderName] ?? [];
    const tasks = folderTasks.map((t) => (t.id === task.id ? task : t));
    this._tasksByFolder$.next({
      ...this._tasksByFolder$.value,
      [folderName]: tasks.sort(sortTasks),
    });
    if (updateServer) {
      return this._updateTask$(task);
    }
    return of(task);
  }

  removeTask(task: Task) {
    const folderName = task.folderName.toLowerCase();
    const folderTasks = this._tasksByFolder$.value[folderName];
    const tasks = folderTasks.filter((t) => t.id !== task.id);
    this._tasksByFolder$.next({
      ...this._tasksByFolder$.value,
      [folderName]: tasks,
    });
    return this._deleteTask$(task).subscribe(() => {
      this._snackBar.open(`Task with removed successfully`, 'Dismiss', {
        duration: 3000,
      });
    });
  }

  addStep(task: Task, step: TaskStep) {
    const newStep = structuredClone(step);
    if (step.id === 0) newStep.id = task.steps.length || 1;
    newStep.taskId = task.id;
    task.steps.push(newStep);
    this.updateTask(task, false); // optimistically update the task in the UI
    this._addNewTaskStep$(newStep).subscribe((stepFromServer) => {
      newStep.id = stepFromServer.id;
      this.updateTask(task, false);
      this._snackBar.open(
        `Step with id ${stepFromServer.id} is added`,
        'Dismiss',
        { duration: 3000 },
      );
    });
  }

  updateStep(task: Task, step: TaskStep) {
    const steps = task.steps.map((s) => (s.id === step.id ? step : s));
    const updatedTask = structuredClone(task);
    updatedTask.steps = steps;
    this.updateTask(updatedTask, false);

    this._updateTaskStep$(step).subscribe(() => {
      this._snackBar.open(`Step with id ${step.id} is updated`, 'Dismiss', {
        duration: 3000,
      });
    });
  }

  removeStep(task: Task, step: TaskStep) {
    const steps = task.steps.filter((s) => s.id !== step.id);
    const updatedTask = structuredClone(task);
    updatedTask.steps = steps;
    this.updateTask(updatedTask, true);
    return this._removeTaskStep$(step).subscribe(() => {
      this._snackBar.open(`Step with id ${step.id} is removed`, 'Dismiss', {
        duration: 3000,
      });
    });
  }

  toggleTaskIsCompleted(task: Task, isSelected = false) {
    const updatedTask = structuredClone(task);
    updatedTask.isCompleted = !task.isCompleted;
    this.updateTask(updatedTask).subscribe((t) => {
      if (isSelected) this.setSelectedTask(t);
      this._snackBar.open(
        `Task with id ${t.id} is marked as ${
          t.isCompleted ? 'completed' : 'not completed'
        }`,
        'Dismiss',
        { duration: 3000 },
      );
    });
    return updatedTask;
  }

  toggleTaskIsImportant(task: Task, isSelected = false) {
    const updatedTask = structuredClone(task);
    updatedTask.isImportant = !task.isImportant;
    this.updateTask(updatedTask).subscribe((t) => {
      if (isSelected) this.setSelectedTask(t);
      this._snackBar.open(
        `Task with id ${t.id} is marked as ${
          t.isImportant ? 'important' : 'not important'
        }`,
        'Dismiss',
        { duration: 3000 },
      );
    });
    return updatedTask;
  }

  promoteStepToTask(task: Task, step: TaskStep) {
    const newTask = this._transformStepToTaskObj(step, task);
    this.removeStep(task, step);
    this._saveTask(newTask);
    this.updateTask(task);
    this._snackBar.open(
      `Step with id ${step.id} is promoted to a task`,
      'Dismiss',
      { duration: 3000 },
    );
  }

  countTasksObservable(folderName?: PageTitles): Observable<number> {
    return this._flatTasks$.pipe(
      map((tasks) => {
        if (folderName) {
          return tasks.filter(filterFolderPredicate(folderName)).length;
        }
        return tasks.length;
      }),
    );
  }

  private _addNewTask(props: CreateTaskProps): Task {
    const { content, folderName } = props;
    let { isInMyDay, isImportant, dueDate, recurrence } = props;
    const { steps, note } = props;
    let fName = folderName ?? DEFAULT_FOLDER.Tasks;
    if (
      folderName === DEFAULT_FOLDER.MyDay ||
      folderName === DEFAULT_FOLDER.Important ||
      folderName === DEFAULT_FOLDER.Planned
    ) {
      fName = DEFAULT_FOLDER.Tasks;
    }

    if (folderName === DEFAULT_FOLDER.Important) {
      isImportant = true;
    }
    if (folderName === DEFAULT_FOLDER.MyDay) {
      isInMyDay = true;
    }
    if (folderName === DEFAULT_FOLDER.Planned) {
      dueDate = new Date();
      recurrence = 'ONCE';
    }

    return {
      id: this._flatTasks$.value.length + 1,
      content,
      folderName: fName,
      dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      isCompleted: false,
      isInMyDay: isInMyDay ?? false,
      isImportant: isImportant ?? false,
      steps: steps ?? [],
      recurrence: recurrence ?? 'ONCE',
      note: note ?? { content: '' },
    };
  }

  private _saveTasksToLocalStorage() {
    localStorage.setItem(
      this.tasksStorageKey,
      JSON.stringify(this._flatTasks$.value),
    );

    // create hash of the tasks and save it to local storage
    createHash(JSON.stringify(this._flatTasks$.value))
      .then((hash: string) => {
        localStorage.setItem(this.tasksHashKey, hash);
        return hash;
      })
      .catch(() =>
        this._snackBar.open('caching failed', 'close', { duration: 2000 }),
      );
  }

  private _loadTasksFromLocalStorage() {
    return localStorage.getItem(this.tasksStorageKey);
  }

  private _saveTaskToServer$ = (saveTask: SaveTaskToServerDto) => {
    return this.http.post<CustomResponse<Task>>(
      `${this.apiUrl}/tasks`,
      saveTask,
    );
  };

  private _updateTask$ = (task: Task): Observable<Task> => {
    const { id } = task;
    const url = `${this.apiUrl}/tasks/${id}`;
    return this.http
      .put<CustomResponse<Task>>(url, task)
      .pipe(map((res) => res.data));
  };

  private _addNewTaskStep$ = (step: TaskStep): Observable<TaskStep> => {
    const url = `${this.apiUrl}/steps`;
    return this.http
      .post<CustomResponse<TaskStep>>(url, step)
      .pipe(map((res) => res.data));
  };

  private _deleteTask$(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/tasks/${task.id}`;
    return this.http
      .delete<CustomResponse<Task>>(url)
      .pipe(map((res) => res.data));
  }

  private _updateTaskStep$ = (step: TaskStep): Observable<Task> => {
    const url = `${this.apiUrl}/steps/${step.id}`;
    return this.http
      .put<CustomResponse<Task>>(url, step)
      .pipe(map((res) => res.data));
  };

  private _removeTaskStep$ = (step: TaskStep): Observable<Task> => {
    const url = `${this.apiUrl}/steps/${step.id}`;
    return this.http
      .delete<CustomResponse<Task>>(url)
      .pipe(map((res) => res.data));
  };

  private _saveTask(task: Task) {
    const newTask = structuredClone(task);
    if (!newTask.id) {
      newTask.id = this._flatTasks$.value.length + 1;
    }
    this._saveTaskToLocalObserver(newTask);

    return this._saveTaskToServer$({
      content: newTask.content,
      folderName: newTask.folderName, // The server will fall back to the folder name if the folder id is not provided or less than 1,
      isImportant: newTask.isImportant,
      isInMyDay: newTask.isInMyDay,
      dueDate: newTask.dueDate,
      note: newTask.note,
      steps: newTask.steps,
    }).pipe(
      catchError((err) => {
        this._snackBar.open('Error while saving the task', 'Dismiss', {
          duration: 5000,
          politeness: 'assertive',
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        return throwError(err);
      }),
      map((res) => {
        res.data.folderName = newTask.folderName;
        res.data.createdAt = newTask.createdAt;
        res.data.updatedAt = newTask.updatedAt;
        this.updateTask(res.data);
        this._snackBar.open('Task added successfully', 'Dismiss', {
          duration: 2000,
        });
        return res.data;
      }),
    );
  }

  private _saveTaskToLocalObserver(newTask: Task) {
    const folderName = newTask.folderName.toLowerCase();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const folderTasks = this._tasksByFolder$.value[folderName] ?? [];
    folderTasks.push(newTask);
    this._tasksByFolder$.next({
      ...this._tasksByFolder$.value,
      [folderName]: folderTasks.sort(sortTasks),
    });
  }

  private _fetchFoldersWithTasks$ = (folderName?: PageTitles | string) => {
    const params = new URLSearchParams();
    if (folderName) {
      params.append('folderName', folderName);
    }
    const url = params.size
      ? `${this.apiUrl}/folders?${params.toString()}`
      : `${this.apiUrl}/folders`;
    this.http
      .get<CustomResponse<Folder[]>>(url) //
      .subscribe((res) => {
        const folders = res.data.items;
        const tasksByFolder = {} as Record<string, Task[]>;
        folders.forEach((folder) => {
          tasksByFolder[folder.name.toLowerCase()] = (folder.tasks ?? []).sort(
            sortTasks,
          );
        });
        this._tasksByFolder$.next(tasksByFolder);
        // const flatTasks = getFlatTasks(tasksByFolder);
        // this._flatTasks$.next(flatTasks);
      });
  };

  private _transformStepToTaskObj(step: TaskStep, task: Task): Task {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return {
      id: this._flatTasks$.value.length + 1,
      content: step.content,
      folderName: task.folderName,
      isCompleted: step.isCompleted,
      isImportant: false,
      isInMyDay: false,
      recurrence: 'ONCE',
      createdAt: step.createdAt,
      updatedAt: step.updatedAt,
      steps: [],
      note: {
        content: '',
        createdAt: step.createdAt,
        updatedAt: step.updatedAt,
      },
    };
  }
}
