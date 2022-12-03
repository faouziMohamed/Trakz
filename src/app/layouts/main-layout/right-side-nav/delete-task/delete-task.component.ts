import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ConfirmDeleteDialogComponent } from '@/layouts/main-layout/right-side-nav/delete-task/confirm-delete-dialog/confirm-delete-dialog.component';
import { ITask } from '@/models/task';

export interface DialogData {
  title: string;
  message: string;
  acceptAction: string;
  cancelAction: string;
}
@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss'],
})
export class DeleteTaskComponent {
  @Input() task: ITask | undefined;

  @Output() deleteTask = new EventEmitter<ITask>();

  constructor(private _dialog: MatDialog) {}

  onClickDeleteButton(task: ITask) {
    const dialogRef = this.openConfirmDialog(task);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteTask.emit(task);
    });
  }

  private openConfirmDialog(task: ITask) {
    const dialogConfig = new MatDialogConfig<DialogData>();
    dialogConfig.disableClose = true;

    const textTruncated =
      task.text.length > 20 ? `${task.text.slice(0, 20)}...` : task.text;
    dialogConfig.data = {
      title: 'Delete Task',
      message: `Are you sure you want to delete the task "${textTruncated}"?`,
      acceptAction: 'Delete',
      cancelAction: 'Cancel',
    };

    return this._dialog.open(ConfirmDeleteDialogComponent, dialogConfig);
  }
}
