import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogData } from '@/layouts/main-layout/right-sidebar/delete-task/delete-task.component';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss'],
})
export class ConfirmDeleteDialogComponent {
  dialogTitle: string;

  dialogMessage: string;

  dialogCancelAction: string;

  dialogAcceptAction: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData,
  ) {
    this.dialogTitle = data.title;
    this.dialogMessage = data.message;
    this.dialogCancelAction = data.cancelAction;
    this.dialogAcceptAction = data.acceptAction;
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
