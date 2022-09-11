import { FormBuilder } from '@angular/forms';
import { ProductFormFactory } from './product-form-factory';

describe('ProductFormFactory', () => {
  it('should create an instance', () => {
    expect(new ProductFormFactory(new FormBuilder())).toBeTruthy();
  });
  describe('createProductFrom()', () => {
    const productFormFactory = new ProductFormFactory(new FormBuilder());
    const productForm = productFormFactory.createProductForm();
    expect(productForm).toBeTruthy();
  });
});
