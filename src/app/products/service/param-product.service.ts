import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ParamProductService {
  private product = new BehaviorSubject<Product | null>(null);

  setProduct(product: Product) {
    this.product.next(product);
  }

  getProductAsObservable(): Observable<Product | null> {
    return this.product.asObservable();
  }
}
