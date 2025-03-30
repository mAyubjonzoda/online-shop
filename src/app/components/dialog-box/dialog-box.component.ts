import { Component, Inject, inject, model } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-box',
  imports: [MatDialogModule],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss',
})
export class DialogBoxComponent {
  public dialogRef = inject(MatDialogRef<DialogBoxComponent>);
  @Inject(MAT_DIALOG_DATA) public data: any;

  onNoClick(): void {
    this.dialogRef.close();
  }
}
