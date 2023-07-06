import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environments';
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const product: Product = {
    id: '5680',
    name: 'Producto servicio',
    description: 'Una descripcion',
    date_release: '2024-05-06',
    date_revision: '2025-05-06',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be true if receive a existing id', () => {
    const id = '1234';
    const result = service.checkProductId(id);
    expect(result).toBeTruthy();
  });

  it('should be correct if save product', () => {
    service.save(product).subscribe((response) => {
      expect(response).toEqual(product);
    });
  });

  it('should be correct if update product', () => {
    product.description = 'Una descripcion editada';
    service.update(product).subscribe((response) => {
      expect(response).toEqual(product);
    });
  });

  // it('should be correct if delete a product by id', () => {
  //   const id = '4672';
  //   service.deleteById(id).subscribe((response) => {
  //     expect(response).toBeTruthy();
  //   });
  //   const req = httpMock.expectOne(`${environment.apiUrl}/products?id=${id}`);
  //   expect(req.request.method).toBe('DELETE');
  //   req.flush(null, { status: 200, statusText: 'OK' });
  // });
});
