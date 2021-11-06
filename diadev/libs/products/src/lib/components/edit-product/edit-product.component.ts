import { Component } from '@angular/core';
import { ProductsEntity } from '../../+state/products/products.models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductsFacade } from '../../+state/products/products.facade';
import { ProductForm } from '../../forms/product-form';
import { ProductFormFactory } from '../../forms/product-form-factory';
import { ProductFormValue } from '../../model/product-form-value.model';

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
  public selectedProduct: Observable<ProductsEntity> =
    this.productsFacade.selectedProducts$.pipe(
      tap((v) => this.productForm.getAsFormGroup().patchValue(v)),
    );

  constructor(
    private readonly productsFacade: ProductsFacade,
    public readonly productForm: ProductForm,
  ) {}

  public onSubmit(productId: string): void {
    const updatedProduct = this.mapProductFormValueToProductEntity(
      this.productForm.getValue(),
      productId,
    );
    this.productsFacade.updateProduct(updatedProduct);
  }

  public onDeleteProduct(id: string): void {
    this.productsFacade.deleteProduct(id);
  }

  private mapProductFormValueToProductEntity(
    productFormValue: ProductFormValue,
    id: string,
  ): ProductsEntity {
    return {
      name: productFormValue.name,
      carbohydratesPer100Gram: +productFormValue.carbohydratesPer100Gram,
      id,
    };
  }
}
