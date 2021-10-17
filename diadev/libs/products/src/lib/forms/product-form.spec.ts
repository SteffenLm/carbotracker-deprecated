import { FormBuilder } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { ProductForm } from './product-form';

describe('ProductForm', () => {
  it('should create an instance', () => {
    const fb: FormBuilder = new FormBuilder();
    expect(new ProductForm(fb.group({}), EMPTY)).toBeTruthy();
  });
});
