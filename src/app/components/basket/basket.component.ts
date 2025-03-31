import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/products.interface';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-basket',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  basket: IProduct[];
  basketSubscription: Subscription;
  ngOnInit(): void {
    this.basketSubscription = this.productsService
      .getProductFromBasket()
      .subscribe((data) => (this.basket = data));
  }
  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }
}
