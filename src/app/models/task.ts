export interface ICustomRecurrence {
  every: number;
  unit: 'day' | 'days' | 'week' | 'month' | 'year';
}
export interface ITimeStampsDate {
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskStep extends ITimeStampsDate {
  id: number;
  text: string;
  isCompleted: boolean;
}

export type TRecurrence =
  | 'daily'
  | 'weekdays'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'once'
  | ICustomRecurrence;

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
  steps: ITaskStep[];
  recurrence: TRecurrence;
  note: ITaskNote;
}
