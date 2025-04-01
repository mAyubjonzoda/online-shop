import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/products.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: string = 'http://localhost:3000/products';
  urlBasket: string = 'http://localhost:3000/basket';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<IProduct[]>(this.url);
  }
  getProduct(id: number) {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }
  postProduct(product: IProduct) {
    return this.http.post<IProduct>(this.url, product);
  }

  updateProduct(product: IProduct) {
    return this.http.put<IProduct>(`${this.url}/${product.id}`, product);
  }

  deleteProduct(id: any) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  postProductToBasket(product: IProduct) {
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
