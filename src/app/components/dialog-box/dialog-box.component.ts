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
    // id: new FormControl(),
  });

  public dialogRef = inject(MatDialogRef<DialogBoxComponent>);
  @Inject(MAT_DIALOG_DATA) public data: any;

  onSubmit() {
    this.data = {
      name: this.myForm.value.name,
      price: this.myForm.value.price,
      image: `/assets/images/${this.myForm.value.image}`,
      // id: this.myForm.value.id,
    };

    console.log(this.myForm);
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
