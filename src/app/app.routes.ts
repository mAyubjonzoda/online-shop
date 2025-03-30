import { Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProductResolverService } from './services/product-resolver.service';

export const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    resolve: { data: ProductResolverService },
  },
  { path: 'basket', component: BasketComponent },
  {
    path: '**',
    redirectTo: '',
    component: BaseComponent,
  },
];
