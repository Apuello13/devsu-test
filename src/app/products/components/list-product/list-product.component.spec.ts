import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ListProductComponent } from './list-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ParamProductService } from '../../service/param-product.service';
import { ProductService } from '../../service/product.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ListProductComponent', () => {
  let service: ProductService;
  let component: ListProductComponent;
  let fixture: ComponentFixture<ListProductComponent>;

  const mockData = [
    {
      id: '1234',
      name: 'Cuenta de ahorros',
      description: 'Una cuenta para ahorrar la plata',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2023-01-31T00:00:00.000+00:00',
      date_revision: '2024-01-31T00:00:00.000+00:00',
    },
    {
      id: '12345',
      name: 'Tarjeta de credito',
      description: 'Una tarjeta para compras las cosas a credito',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2023-07-04T00:00:00.000+00:00',
      date_revision: '2024-07-04T00:00:00.000+00:00',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProductComponent],
      imports: [HttpClientTestingModule],
      providers: [ProductService, ParamProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(ListProductComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display data in the table', fakeAsync(() => {
    spyOn(service, 'getAll').and.returnValue(of(mockData));
    fixture.detectChanges();
    tick();
    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBe(0);
  }));
});
