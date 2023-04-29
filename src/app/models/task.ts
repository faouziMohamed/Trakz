export interface CustomRecurrence {
  every: number;
  unit: 'day' | 'days' | 'week' | 'month' | 'year';
}
export interface ITimeStampsDate {
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskStep extends ITimeStampsDate {
  id: number;
  text: string;
  isCompleted: boolean;
}

export type Recurrence =
  | 'daily'
  | 'weekdays'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'once'
  | CustomRecurrence;

export interface ITaskNote {
  text: string | '';
  createdAt?: ITimeStampsDate['createdAt'];
  updatedAt?: ITimeStampsDate['updatedAt'];
}

export interface ITask extends ITimeStampsDate {
  id: number;
  parent: string;
  dueDate?: Date;
  text: string;
  isInMyDay: boolean;
  isImportant: boolean;
  isCompleted: boolean;
  steps: TaskStep[];
  recurrence: Recurrence;
  note: ITaskNote;
}

export enum TaskStatus {
  earlier = 'earlier',
  today = 'today',
  tomorrow = 'tomorrow',
  later = 'later',
  completed = 'completed',
  uncompleted = 'uncompleted',
}
