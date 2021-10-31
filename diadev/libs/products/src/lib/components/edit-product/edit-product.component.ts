import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsFacade } from '../../+state/products/products.facade';
import { ProductForm } from '../../forms/product-form';
import { ProductFormFactory } from '../../forms/product-form-factory';

@Component({
  selector: 'diadev-edit-product-component',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
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
export class EditProductComponent {
  public isProductFormValid: Observable<boolean> = this.productForm.isValid();

  constructor(
    private readonly productsFacade: ProductsFacade,
    public readonly productForm: ProductForm,
  ) {}

  public onSubmit(): void {
    this.productsFacade.updateSelectedProduct(this.productForm.getValue());
  }

  public onDeleteProduct(): void {
    this.productsFacade.deleteSelectedProduct();
  }
}
