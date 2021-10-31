import { Component } from '@angular/core';
import { ProductsFacade } from '../../+state/products/products.facade';
import { ProductForm } from '../../forms/product-form';
import { ProductFormFactory } from '../../forms/product-form-factory';

@Component({
  selector: 'diadev-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  providers: [
    ProductFormFactory,
    {
      provide: ProductForm,
      useFactory: (productFormFactory: ProductFormFactory) =>
        productFormFactory.createProductForm(),
      deps: [ProductFormFactory],
    },
  ],
})
export class CreateProductComponent {
  productFormIsValid = this.productForm.isValid();

  constructor(
    private readonly productsFacade: ProductsFacade,
    public readonly productForm: ProductForm,
  ) {}

  public onSubmit(): void {
    const productFormValue = this.productForm.getValue();
    const newProduct = {
      name: productFormValue.name,
      carbohydratesPer100Gram: +productFormValue.carbohydratesPer100Gram,
    };
    this.productsFacade.addProduct(newProduct);
  }
}
