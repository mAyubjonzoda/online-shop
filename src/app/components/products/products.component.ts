import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IProduct } from '../../interfaces/products.interface';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';

import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-products',
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    NgIf,
    MatToolbarModule,
    RouterLink,
  ],
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

  addToBasket(product: IProduct) {
    this.productsService
      .postProductToBasket(product)
      .subscribe((data) => console.log(data));
  }

  openDialog(product?: IProduct): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id) this.updateData(data);
        else this.postData(data);
      }
    });
  }

  postData(data: IProduct) {
    this.productsService.postProduct(data).subscribe((data) => {
      this.products.push(data);
    });
  }

  updateData(product: IProduct) {
    this.productsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if (product.id === data.id) {
          return data;
        } else {
          return product;
        }
      });
    });
  }

  deleteItem(id: any) {
    console.log(id);
    this.productsService.deleteProduct(id).subscribe(() =>
      this.products.find((item) => {
        if (id === item.id) {
          let idx = this.products.findIndex((data) => data.id === id);
          this.products.splice(idx, 1);
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
}
