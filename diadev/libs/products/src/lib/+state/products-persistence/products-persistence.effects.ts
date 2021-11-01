import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import {
  createLocalStorageLoader,
  createLocalStorageSaver,
} from '@diadev/localstorage';

import * as ProductsPersistenceActions from './products-persistence.actions';
import * as ProductsFeature from '../products/products.reducer';

@Injectable()
export class ProductsPersistenceEffects {
  loadProductsState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsPersistenceActions.rehydrateProductsState),
      map(() => {
        try {
          const productsState = this.loadProductsState();
          return ProductsPersistenceActions.rehydrateProductsStateSuccess({
            productsState,
          });
        } catch (error) {
          return ProductsPersistenceActions.rehydrateProductsStateFailure();
        }
      }),
    );
  });

  saveProductsState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsPersistenceActions.hydrateProductsState),
      map(({ productsState, sourceAction }) => {
        try {
          this.saveProductsState(productsState);
          return ProductsPersistenceActions.hydrateProductsStateSuccess({
            sourceAction,
          });
        } catch (error) {
          return ProductsPersistenceActions.hydrateProductsStateFailure({
            sourceAction,
          });
        }
      }),
    );
  });

  constructor(private readonly actions$: Actions) {}

  private saveProductsState =
    createLocalStorageSaver<ProductsFeature.ProductsState>(
      ProductsFeature.PRODUCTS_FEATURE_KEY,
    );
  private loadProductsState =
    createLocalStorageLoader<ProductsFeature.ProductsState>(
      ProductsFeature.PRODUCTS_FEATURE_KEY,
    );
}
