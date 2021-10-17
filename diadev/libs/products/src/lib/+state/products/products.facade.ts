import { Injectable } from '@angular/core';
import { ProductsEntity } from './products.models';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { ProductFormValue } from '../../model/product-form-value.model';

import * as ProductsActions from './products.actions';
import * as ProductsSelectors from './products.selectors';

@Injectable()
export class ProductsFacade {
  publicloaded$ = this.store.select(ProductsSelectors.selectProductsLoaded);
  allProducts$ = this.store.select(ProductsSelectors.selectAllProducts);
  selectedProducts$ = this.store.select(ProductsSelectors.selectSelected);

  constructor(private readonly store: Store) {
    this.store.dispatch(ProductsActions.init());
  }

  public setSelectedProduct(productId: string): void {
    this.store.dispatch(ProductsActions.setSelectedProduct({ productId }));
  }

  public openCreateProductDialog(): void {
    this.store.dispatch(ProductsActions.openCreateProductDialog());
  }

  public updateProduct(updatedProduct: Update<ProductsEntity>): void {
    this.store.dispatch(ProductsActions.updateProduct({ updatedProduct }));
  }

  public updateSelectedProduct(updatedProduct: ProductFormValue) {
    this.store.dispatch(
      ProductsActions.updateSelectedProduct({
        updatedProduct: {
          name: updatedProduct.name,
          carbohydratesPer100Gram: +updatedProduct.carbohydratesPer100Gram,
        },
      }),
    );
  }

  public deleteProduct(productId: string): void {
    this.store.dispatch(ProductsActions.deleteProduct({ productId }));
  }

  public deleteSelectedProduct(): void {
    this.store.dispatch(ProductsActions.deleteSelectedProduct());
  }
}
