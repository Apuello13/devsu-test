import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productEndPoint: string = `${environment.apiUrl}/products`;
  constructor(private http: HttpClient) {}

  save(product: Product) {
    return this.http.post<Product>(this.productEndPoint, product);
  }

  update(product: Product) {
    return this.http.put<Product>(this.productEndPoint, product);
  }

  getAll() {
    return this.http.get<Product[]>(this.productEndPoint);
  }

  deleteById(productId: string) {
    return this.http.delete(`${this.productEndPoint}?id=${productId}`);
  }

  checkProductId(productId: string) {
    return this.http.get<boolean>(
      `${this.productEndPoint}/verification?id=${productId}`
    );
  }
}
