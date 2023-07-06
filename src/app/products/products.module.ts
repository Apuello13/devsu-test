import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductService } from './service/product.service';
import { ParamProductService } from './service/param-product.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [FormProductComponent, ListProductComponent],
  imports: [SharedModule, ProductsRoutingModule],
  providers: [ProductService, ParamProductService, DatePipe],
})
export class ProductsModule {}
