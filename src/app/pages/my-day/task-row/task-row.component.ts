import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask, ITaskStep } from '@models/task';
import { TaskDataService } from '@/services/tasks/task-data.service';

@Component({
  selector: 'app-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
})
export class TaskRowComponent implements OnInit {
  @Input() task: ITask | undefined;

  @Output() selected = new EventEmitter<ITask>();

  constructor(private _tasksService: TaskDataService) {}

  ngOnInit(): void {
    this.task = this.task || ({} as ITask);
  }
  setSelectedTask(task: ITask) {
    this._tasksService.setSelection(task);
  }

  isPassedDueDate(dueDate: Date) {
    return dueDate < new Date();
  }

  countCompletedTasks(steps: ITaskStep[]) {
    return steps.filter((step) => step.isCompleted).length;
  }

  onTaskClick() {
    this.selected.emit(this.task);
  }
}
