import { Injectable } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ProductForm } from './product-form';
import { ProductFormModel } from './product-form-model';

@Injectable()
export class ProductFormFactory {
  constructor(private readonly formBuilder: UntypedFormBuilder) {}

  public createProductForm(): ProductForm {
    return new ProductForm(new ProductFormModel(this.formBuilder));
  }
}
