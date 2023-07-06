import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { Global } from 'src/app/core/utils/global';
import { ParamProductService } from '../../service/param-product.service';
import { ProductService } from '../../service/product.service';
import { fieldLength } from '../../utils/fields-length';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  productForm!: FormGroup;
  isInvalidId: boolean = false;
  isEdit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private _product: ProductService,
    private _paramProduct: ParamProductService,
    private _alert: AlertService
  ) {
    this.initForm();
  }

  initForm(): void {
    const { id, name, description } = fieldLength;
    this.productForm = this.fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(id.min),
          Validators.maxLength(id.max),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(name.min),
          Validators.maxLength(name.max),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(description.min),
          Validators.maxLength(description.max),
        ],
      ],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProductToEdit();
  }

  checkId(): void {
    const id = this.productForm.get('id')?.value;
    if (id !== Global.EMPTY) {
      this._product
        .checkProductId(id)
        .subscribe((response) => (this.isInvalidId = response));
    }
  }

  getProductToEdit(): void {
    this._paramProduct.getProductAsObservable().subscribe((product) => {
      if (product != null) {
        this.isEdit = true;
        const dateFormat = 'YYYY-MM-dd';
        const { date_release, date_revision, ...data } = product;
        const body = {
          date_release: this.datePipe.transform(date_release, dateFormat),
          date_revision: this.datePipe.transform(date_revision, dateFormat),
          ...data,
        };
        this.productForm.patchValue(body);
        this.productForm.get('id')?.disable();
      }
    });
  }

  setDateRevision(): void {
    const dateRelease = this.productForm.get('date_release')?.value;
    const dateRevision = this.formatDate(dateRelease);
    this.productForm.get('date_revision')?.setValue(dateRevision);
  }

  formatDate(date: string): string {
    const SYMBOL: string = '-';
    const values = date.split(SYMBOL);
    const year = Number(values[Global.ONE - Global.ONE]) + Global.ONE;
    return `${year}${SYMBOL}${values[Global.ONE]}${SYMBOL}${
      values[Global.TWO]
    }`;
  }

  save(): void {
    const product = this.productForm.getRawValue();
    this._product[this.isEdit ? 'update' : 'save'](product).subscribe(
      () => {
        this._alert.success();
        this.goHome();
      },
      () => {
        this._alert.error();
      }
    );
  }

  isFieldInvalid(key: string): boolean | undefined {
    const control = this.productForm.get(key);
    return control?.invalid && (control?.dirty || control.touched);
  }

  goHome(): void {
    this.router.navigateByUrl('/products');
  }
}
