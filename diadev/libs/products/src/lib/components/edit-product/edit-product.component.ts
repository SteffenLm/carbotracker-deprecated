import { Component } from '@angular/core';
import { ProductsEntity } from '../../+state/products/products-entity.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductForm } from '../../forms/product-form';
import { ProductFormFactory } from '../../forms/product-form-factory';
import { ProductFormValue } from '../../model/product-form-value.model';
import { Store } from '@ngrx/store';
import { ProductEditPageActions } from '../../+state/products/actions/ui';
import { selectSelected } from '../../+state/products/selectors/products.selectors';

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
  public selectedProduct: Observable<ProductsEntity> = this.store
    .select(selectSelected)
    .pipe(
      tap((selectedProduct) =>
        this.productForm.getAsFormGroup().patchValue(selectedProduct),
      ),
    );

  constructor(
    private readonly store: Store,
    public readonly productForm: ProductForm,
  ) {}

  public onSubmit(productId: string): void {
    const updatedProduct = this.mapProductFormValueToProductEntity(
      this.productForm.getValue(),
      productId,
    );
    this.store.dispatch(
      ProductEditPageActions.updateProduct({ updatedProduct }),
    );
  }

  public onDeleteProduct(productId: string): void {
    this.store.dispatch(ProductEditPageActions.deleteProduct({ productId }));
  }

  public onClickBackNavigation(): void {
    this.store.dispatch(ProductEditPageActions.navigateBack());
  }

  public onGoBack(): void {
    this.store.dispatch(ProductEditPageActions.goBackToProducts());
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
