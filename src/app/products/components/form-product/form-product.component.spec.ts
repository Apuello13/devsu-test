import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductComponent } from './form-product.component';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { ParamProductService } from '../../service/param-product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormProductComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [DatePipe, ProductService, ParamProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with valid state', () => {
    expect(component.productForm.valid).toBeFalsy();
    expect(component.productForm.errors).toBeNull();
    expect(component.productForm.get('id')?.value).toBe('');
    expect(component.productForm.get('name')?.value).toBe('');
    expect(component.productForm.get('description')?.value).toBe('');
    expect(component.productForm.get('logo')?.value).toBe('');
    expect(component.productForm.get('date_release')?.value).toBe('');
    expect(component.productForm.get('date_revision')?.value).toBe('');
  });

  it('should validate id validation', () => {
    component.productForm.get('id')?.setValue('12');
    expect(component.productForm.get('id')?.valid).toBeFalsy();
    component.productForm.get('id')?.setValue('12345678901');
    expect(component.productForm.get('id')?.valid).toBeFalsy();
    component.productForm.get('id')?.setValue('1234');
    expect(component.productForm.get('id')?.valid).toBeTruthy();
  });

  it('should validate name validation', () => {
    const key = 'name';
    component.productForm.get(key)?.setValue('hola');
    expect(component.productForm.get(key)?.valid).toBeFalsy();
    component.productForm
      .get(key)
      ?.setValue(
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, quod! Sit, inventore perferendis distinctio, cumque obcaecati cum ex, quidem ducimus minima voluptatibus tenetur quam. Corporis eos fugiat magnam velit beatae cum maxime obcaecati similique temporibus sapiente, cupiditate perspiciatis repellat itaque ex repudiandae numquam tempore ab aperiam nihil omnis laboriosam ad iste recusandae. Facere sequi natus ex a, consequatur libero distinctio sed rem quas labore. Ullam officiis, ipsa vitae numquam excepturi dicta ratione mollitia itaque minus corrupti fugiat aut quia porro. Laboriosam, delectus iste vero aperiam id eveniet aut sed illum sequi quo. Deserunt ex, ullam voluptates labore dignissimos provident molestiae at!'
      );
    expect(component.productForm.get(key)?.valid).toBeFalsy();
    component.productForm.get(key)?.setValue('Tarjeta de credito');
    expect(component.productForm.get(key)?.valid).toBeTruthy();
  });

  it('should validate description validation', () => {
    const key = 'description';
    component.productForm.get(key)?.setValue('hola');
    expect(component.productForm.get(key)?.valid).toBeFalsy();
    component.productForm
      .get(key)
      ?.setValue(
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus laudantium harum at consequuntur necessitatibus unde rem eius porro sequi voluptatibus obcaecati, natus vitae similique eum possimus quisquam eaque enim, aspernatur tempore earum? Est doloremque placeat quas, repellat excepturi quia sint explicabo illo quam dolore rerum aliquid sed totam tempora ex aut temporibus sit nobis sequi quidem neque, enim nulla a deleniti. Qui sequi facilis incidunt ratione eius nam, ut unde placeat nesciunt eaque, eligendi numquam! Enim libero aspernatur odit. Possimus, voluptates sequi quidem suscipit consequuntur impedit officia at voluptate non atque, blanditiis nihil enim nesciunt, necessitatibus perferendis laboriosam corrupti iste asperiores a reiciendis dicta facilis. Vel officia corrupti quisquam debitis nobis, dolores, sed exercitationem sint rem aut mollitia veniam ea necessitatibus aliquid fuga quidem quaerat! Ex sunt nesciunt odit similique iste sapiente ab natus, architecto expedita! Corrupti tempore architecto deleniti quas deserunt eveniet voluptatem! Explicabo itaque aliquam reiciendis neque, esse quam. Sunt fugit, ullam quibusdam recusandae ipsum nesciunt possimus blanditiis praesentium ratione? Eveniet error sit temporibus assumenda! Quas consectetur molestiae nemo illo necessitatibus sit dolorum dolore voluptas excepturi repudiandae quasi, natus nesciunt cumque consequatur reiciendis odio doloribus quis expedita ab quae. Velit laboriosam officiis necessitatibus recusandae, temporibus doloremque? Commodi, eaque numquam!'
      );
    expect(component.productForm.get(key)?.valid).toBeFalsy();
    component.productForm.get(key)?.setValue('Una descripcion valida!');
    expect(component.productForm.get(key)?.valid).toBeTruthy();
  });

  it('should set the date when field date_release change', () => {
    const date = '2023-04-05';
    component.productForm.get('date_release')?.setValue(date);
    fixture.detectChanges();
    component.setDateRevision();
    const dateRevision = component.formatDate(date);
    expect(component.productForm.get('date_revision')?.value).toEqual(
      dateRevision
    );
  });

  it('should submit form on valid input', () => {
    spyOn(component, 'save');
    component.productForm.get('id')?.setValue('8458');
    component.productForm.get('name')?.setValue('Demo de tarjeta');
    component.productForm.get('description')?.setValue('Una descripcion');
    component.productForm
      .get('logo')
      ?.setValue(
        'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg'
      );
    component.productForm.get('date_release')?.setValue('');
    component.productForm.get('date_revision')?.setValue('');
    component.save();

    expect(component.save).toHaveBeenCalled();
  });
});
