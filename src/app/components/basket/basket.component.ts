import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/products.interface';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-basket',
  imports: [MatCardModule, MatButtonModule, NgIf],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private basketService: BasketService
  ) {}
  basket: IProduct[];
  basketSubscription: Subscription;
  ngOnInit(): void {
    this.basketSubscription = this.basketService
      .getProductFromBasket()
      .subscribe((data) => (this.basket = data));
  }
  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

  minusItemFromBasket(item: IProduct) {
    if (item.quantity === 1) {
      this.basketService.deleteProductFromBasket(item.id).subscribe(() => {
        let idx = this.basket.findIndex((data) => data.id === item.id);
        this.basket.splice(idx, 1);
      });
    } else {
      item.quantity -= 1;
      this.basketService.updateProductToBasket(item).subscribe((data) => {});
    }
  }
  plusItemFromBasket(item: IProduct) {
    item.quantity += 1;
    this.basketService.updateProductToBasket(item).subscribe((data) => {});
  }
}
