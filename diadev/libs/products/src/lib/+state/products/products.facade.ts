import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProductsEntity } from './products.models';

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

  public addProduct(product: Omit<ProductsEntity, 'id'>): void {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    this.store.dispatch(
      ProductsActions.createProduct({
        product: newProduct,
      }),
    );
  }

  public updateProduct(updatedProduct: ProductsEntity): void {
    this.store.dispatch(
      ProductsActions.updateProduct({
        updatedProduct: {
          id: updatedProduct.id,
          changes: {
            ...updatedProduct,
          },
        },
      }),
    );
  }

  public deleteProduct(productId: string): void {
    this.store.dispatch(ProductsActions.deleteProduct({ productId }));
  }
}
