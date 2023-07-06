import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { Product } from '../../models/product';
import { ParamProductService } from '../../service/param-product.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
})
export class ListProductComponent implements OnInit {
  products: Product[] = [];
  dateFormatt: string = 'dd/MM/YYYY';
  sizesPages: number[] = [5, 10, 15];
  currentSizePage: number = 5;
  rows: Product[] = [];

  constructor(
    private _product: ProductService,
    private _alert: AlertService,
    private _paramProduct: ParamProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this._product.getAll().subscribe((response) => {
      this.products = response;
      this.rows = this.paginateRows();
    });
  }

  paginateRows(products: Product[] = this.products): Product[] {
    const ZERO: number = 0;
    if (this.products.length !== ZERO)
      return products.slice(ZERO, this.currentSizePage);
    return [];
  }

  confirmDelete(productId: string): void {
    this._alert.confirm().then((result) => {
      if (result.isConfirmed) this.deleteById(productId);
    });
  }

  deleteById(productId: string): void {
    this._product.deleteById(productId).subscribe(
      () => {
        this._alert.success();
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
      },
      () => this._alert.error()
    );
  }

  goFromToEdit(product: Product): void {
    this._paramProduct.setProduct(product);
    this.router.navigateByUrl('/products/form');
  }

  setCurrentSizePage(event: any): void {
    const value = event.target?.value;
    if (value) {
      this.currentSizePage = event.target.value;
      this.rows = this.paginateRows();
    }
  }

  search(event: any): void {
    const ZERO: number = 0;
    const value: string = event.target?.value;
    if (value.length == ZERO) this.rows = this.paginateRows();
    else {
      const regExp = new RegExp(value, 'i');
      const products = this.products.filter((p) => regExp.test(p.name));
      this.rows = this.paginateRows(products);
    }
  }
}
