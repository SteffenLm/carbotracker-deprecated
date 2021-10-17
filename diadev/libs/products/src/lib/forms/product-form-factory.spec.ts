import { ProductFormFactory } from './product-form-factory';

describe('ProductFormFactory', () => {
  it('should create an instance', () => {
    expect(new ProductFormFactory()).toBeTruthy();
  });
});
