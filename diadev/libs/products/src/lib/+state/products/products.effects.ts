import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';

import * as ProductsActions from './products.actions';
import * as rehydrateProductsState from '../products-persistence/products-persistence.actions';
import * as ProductsSelectors from './products.selectors';

@Injectable()
export class ProductsEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.init),
      switchMap(() => {
        return of(rehydrateProductsState.rehydrateProductsState());
      }),
    );
  });

  editProductsState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ProductsActions.addProduct,
        ProductsActions.deleteProduct,
        ProductsActions.updateProduct,
        ProductsActions.deleteSelectedProduct,
      ),
      concatMap(() => this.store.select(ProductsSelectors.selectProductsState)),
      map((productsState) =>
        rehydrateProductsState.hydrateProductsState({ productsState }),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
  ) {}
}
