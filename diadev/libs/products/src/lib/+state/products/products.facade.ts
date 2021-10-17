import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

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
}
