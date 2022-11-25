export interface ICustomRecurrence {
  every: number;
  unit: 'day' | 'days' | 'week' | 'month' | 'year';
}

export interface ITaskStep {
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

export interface ITask {
  id: number;
  parent: string;
  dueDate?: Date;
  text: string;
  isInMyDay: boolean;
  isImportant: boolean;
  isCompleted: boolean;
  steps: ITaskStep[];
  recurrence: TRecurrence;
  createdAt: Date;
  note: {
    text: string | '';
    lastEdited: Date | null;
  };
}
