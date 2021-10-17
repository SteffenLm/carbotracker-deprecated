import { Injectable } from '@angular/core';
import {
  createLocalStorageLoader,
  createLocalStorageSaver,
} from '@diadev/localstorage';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';

import * as ProductsActions from './products.actions';
import * as ProductsFeature from './products.reducer';
import * as ProductsSelectors from './products.selectors';

@Injectable()
export class ProductsEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.init),
      switchMap(() => {
        return of(ProductsActions.rehydrateProductsState());
      }),
    );
  });

  loadProductsState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.rehydrateProductsState),
      map(() => {
        try {
          const productsState = this.loadProductsState();
          return ProductsActions.rehydrateProductsStateSuccess({
            productsState,
          });
        } catch (error) {
          return ProductsActions.rehydrateProductsStateFailure();
        }
      }),
    );
  });

  saveProductsState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.hydrateProductsState),
      map(({ productsState }) => {
        try {
          this.saveProductsState(productsState);
          return ProductsActions.hydrateProductsStateSuccess();
        } catch (error) {
          return ProductsActions.hydrateProductsStateFailure();
        }
      }),
    );
  });

  editProductsState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ProductsActions.addProduct,
        ProductsActions.deleteProduct,
        ProductsActions.updateProduct,
      ),
      concatMap(() => this.store.select(ProductsSelectors.selectProductsState)),
      map((productsState) =>
        ProductsActions.hydrateProductsState({ productsState }),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
  ) {}

  private saveProductsState =
    createLocalStorageSaver<ProductsFeature.ProductsState>(
      ProductsFeature.PRODUCTS_FEATURE_KEY,
    );
  private loadProductsState =
    createLocalStorageLoader<ProductsFeature.ProductsState>(
      ProductsFeature.PRODUCTS_FEATURE_KEY,
    );
}
