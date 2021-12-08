import { NgModule } from '@angular/core';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SystemApiActions } from './+state/products/actions/api';
import {
  ProductsLocalStorageEffects,
  ProductsSnackBarEffects,
} from './+state/products/effects';
import { PRODUCTS_FEATURE_KEY } from './+state/products/model/products-state.model';
import { productsReducer } from './+state/products/reducers/products.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(PRODUCTS_FEATURE_KEY, productsReducer),
    EffectsModule.forFeature([
      ProductsLocalStorageEffects,
      ProductsSnackBarEffects,
    ]),
  ],
  providers: [],
  declarations: [],
})
export class ProductsStateModule {
  constructor(store: Store) {
    store.dispatch(SystemApiActions.initialize());
  }
}
