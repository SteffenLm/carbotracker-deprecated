import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { createEffect, Actions, concatLatestFrom, ofType } from '@ngrx/effects';

import { ProductsSelectors } from '../selectors';

import { LocalStorageApiActions, SystemApiActions } from '../actions/api';
import {
  ProductCreatePageActions,
  ProductEditPageActions,
} from '../actions/ui';
import { ProductsLocalStorageService } from '../../../services/products-local-storage.service';
import { ProductsState } from '../model/products-state.model';

@Injectable()
export class ProductsLocalStorageEffects {
  saveStateToLocalStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ProductCreatePageActions.saveProduct,
        ProductEditPageActions.updateProduct,
        ProductEditPageActions.deleteProduct,
      ),
      concatLatestFrom(() => this.selectProductState()),
      map(([, productsState]) => {
        try {
          this.productsLocalStorageService.save(productsState);
          return LocalStorageApiActions.saveProductStateToLocalStorageSuccess();
        } catch {
          return LocalStorageApiActions.saveProductStateToLocalStorageFailure();
        }
      }),
    );
  });

  loadStateFromLocalStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SystemApiActions.initialize),
      map(() => {
        try {
          const cachedState = this.productsLocalStorageService.load();
          return LocalStorageApiActions.loadProductStateFromLocalStorageSuccess(
            { productsState: cachedState },
          );
        } catch {
          return LocalStorageApiActions.loadProductStateFromLocalStorageFailure();
        }
      }),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly productsLocalStorageService: ProductsLocalStorageService,
  ) {}

  private selectProductState(): Observable<ProductsState> {
    return this.store.select(ProductsSelectors.selectProductsState);
  }
}
