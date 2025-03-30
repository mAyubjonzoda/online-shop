import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/products.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [MatCardModule, RouterLink, MatButtonModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  productSubscription: Subscription;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data'];
    });
  }
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
