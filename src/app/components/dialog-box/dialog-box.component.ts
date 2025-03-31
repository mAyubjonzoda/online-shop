import { Component, inject, OnInit } from '@angular/core';
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
export class DialogBoxComponent implements OnInit {
  ///////////////////////////////////////////////
  constructor() {}

  public dialogRef = inject(MatDialogRef<DialogBoxComponent>);
  public data = inject(MAT_DIALOG_DATA);

  isNew: boolean = true;
  myForm!: FormGroup;
  ngOnInit(): void {
    this.isNew = !this.data || !this.data.id;

    this.myForm = new FormGroup({
      id: new FormControl(this.isNew ? null : this.data.id),
      name: new FormControl(this.data?.name ?? ''),
      price: new FormControl(this.data?.price ?? ''),
      image: new FormControl(this.data?.image ?? ''),
      description: new FormControl(this.data?.description ?? ''),
    });
  }

  onSubmit() {
    this.data = {
      id: this.isNew ? undefined : this.myForm.value.id,
      name: this.myForm.value.name,
      price: this.myForm.value.price,
      image: `/assets/images/${this.myForm.value.image}`,
      description: this.myForm.value.description,
    };

    console.log(this.myForm);
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
}
