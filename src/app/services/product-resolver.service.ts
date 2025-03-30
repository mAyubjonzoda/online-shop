import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RedirectCommand,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { IProduct } from '../interfaces/products.interface';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<IProduct> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IProduct> {
    return this.productsService.getProduct(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['products']);
        return EMPTY;
      })
    );
  }
}
