import { Component, Inject, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-dialog-box',
  imports: [
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss',
})
export class DialogBoxComponent {
  myForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    image: new FormControl(),
  });

  public dialogRef = inject(MatDialogRef<DialogBoxComponent>);
  @Inject(MAT_DIALOG_DATA) public data: any;

  onSubmit() {
    console.log(this.myForm);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
