export interface CustomRecurrence {
  every: number;
  unit: 'day' | 'days' | 'week' | 'month' | 'year';
}
export type Recurrence =
  | 'DAILY'
  | 'WEEKDAYS'
  | 'WEEKLY'
  | 'MONTHLY'
  | 'YEARLY'
  | 'ONCE'
  | CustomRecurrence;

export interface TimeStampsDate {
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskStep extends TimeStampsDate {
  id: number;
  content: string;
  isCompleted: boolean;
  taskId: number;
}

export interface TaskNote {
  content: string | '';
  createdAt?: TimeStampsDate['createdAt'];
  updatedAt?: TimeStampsDate['updatedAt'];
}

export interface Folder {
  id: number;
  name: string;
  description: string;
  tasks?: Task[];
}

export interface Task extends TimeStampsDate {
  id: number;
  folderName: string;
  // folder: Folder;
  dueDate?: Date;
  content: string;
  isInMyDay: boolean;
  isImportant: boolean;
  isCompleted: boolean;
  steps: TaskStep[];
  recurrence?: Recurrence;
  note?: TaskNote;
}

export enum TaskStatus {
  earlier = 'earlier',
  today = 'today',
  tomorrow = 'tomorrow',
  later = 'later',
  completed = 'completed',
  uncompleted = 'uncompleted',
}

export const DEFAULT_FOLDER = {
  MyDay: 'My Day',
  Important: 'Important',
  Planned: 'Planned',
  Tasks: 'Tasks',
  Projects: 'Projects',
} as const;

export interface TasksWithFolder {
  folderName: string;
  tasks: Task[];
}
