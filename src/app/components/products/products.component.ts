import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IProduct } from '../../interfaces/products.interface';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';

import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
@Component({
  selector: 'app-products',
  imports: [MatCardModule, MatButtonModule, NgIf, MatToolbarModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProduct[];
  productSubscription: Subscription;
  canEdit: boolean = false;
  canView: boolean = false;
  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    //....

    this.canEdit = true;

    this.productSubscription = this.productsService
      .getProducts()
      .subscribe((data) => {
        this.products = data;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent);
  }
  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
}
