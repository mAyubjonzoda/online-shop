import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/products.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: string = 'http://localhost:3000/products';
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
  deleteProduct(id: any) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
