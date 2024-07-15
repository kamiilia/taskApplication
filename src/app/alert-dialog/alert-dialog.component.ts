import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent {
  message: string;
  buttonback: string;
  buttonDelete: string;
  constructor(@Inject(MAT_DIALOG_DATA)
  private data: {
    message: string,
    buttonback: string,
    buttonDelete: string,
  },
    private dialogRef: MatDialogRef<AlertDialogComponent>) {
    if (data?.message) this.message = data.message;
    if (data?.buttonback) this.buttonback = data.buttonback;
    if (data?.buttonDelete) this.buttonDelete = data.buttonDelete;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  confirmDeletingTask(): void {
    this.dialogRef.close(true);
  }

}
