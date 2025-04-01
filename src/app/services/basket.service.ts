import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/products.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient) {}
  urlBasket: string = 'http://localhost:3000/basket';
  addProductToBasket(product: IProduct) {
    return this.http.post<IProduct>(this.urlBasket, product);
  }

  getProductFromBasket() {
    return this.http.get<IProduct[]>(this.urlBasket);
  }

  updateProductToBasket(product: IProduct) {
    return this.http.put<IProduct>(`${this.urlBasket}/${product.id}`, product);
  }

  deleteProductFromBasket(id: any) {
    return this.http.delete<any>(`${this.urlBasket}/${id}`);
  }
}
