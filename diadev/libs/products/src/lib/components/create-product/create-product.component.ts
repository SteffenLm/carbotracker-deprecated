import { Component } from '@angular/core';
import { ProductsEntity } from '../../+state/products/products-entity.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductCreatePageActions } from '../../+state/products/actions/ui';
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
  public isProductFormValid: Observable<boolean> = this.productForm.isValid();

  constructor(
    private readonly store: Store,
    public readonly productForm: ProductForm,
  ) {}

  public onSave(): void {
    const product = this.getProductFromForm();
    this.store.dispatch(ProductCreatePageActions.saveProduct({ product }));
  }

  public onClose(): void {
    this.store.dispatch(ProductCreatePageActions.abortProductCreation());
  }

  public onClickBackNavigation(): void {
    this.store.dispatch(ProductCreatePageActions.navigateBack());
  }

  private getProductFromForm(): ProductsEntity {
    const { name, carbohydratesPer100Gram } = this.productForm.getValue();
    const product = {
      name: name,
      carbohydratesPer100Gram: +carbohydratesPer100Gram,
      id: Date.now().toString(),
    };
    return product;
  }
}
