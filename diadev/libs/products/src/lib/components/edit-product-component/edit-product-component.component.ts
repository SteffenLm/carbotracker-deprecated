import { Component } from '@angular/core';
import { ProductsFacade } from '../../+state/products/products.facade';
import { ProductForm } from '../../forms/product-form';
import { ProductFormValue } from '../../model/product-form-value.model';

@Component({
  selector: 'diadev-edit-product-component',
  templateUrl: './edit-product-component.component.html',
  styleUrls: ['./edit-product-component.component.scss'],
})
export class EditProductComponentComponent {
  constructor(
    private readonly productsFacade: ProductsFacade,
    public readonly productForm: ProductForm<ProductFormValue>,
  ) {}

  public onSubmit(): void {
    this.productsFacade.updateSelectedProduct(
      this.productForm.getAsFormGroup().value,
    );
  }

  public onDeleteProduct(): void {
    this.productsFacade.deleteSelectedProduct();
  }
}
