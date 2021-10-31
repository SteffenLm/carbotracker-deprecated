import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';

import {
  createLocalStorageLoader,
  createLocalStorageSaver,
} from '@diadev/localstorage';
import { ProductsDialogService } from '../../services/products-dialog.service';

import * as ProductsActions from './products.actions';
import * as ProductsFeature from './products.reducer';
import * as ProductsSelectors from './products.selectors';
import { ProductsEntity } from './products.models';

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

  createProduct = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsActions.openCreateProductDialog),
        tap(() => {
          this.productsDialogService.openCreateProductDialog();
        }),
      );
    },
    { dispatch: false },
  );

  editProduct = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsActions.selectProduct),
        concatLatestFrom(() =>
          this.store.select(ProductsSelectors.selectSelected),
        ),
        tap(([, selectedProduct]) => {
          console.log(selectedProduct);
          this.productsDialogService.openEditProductDialog(
            selectedProduct as ProductsEntity,
          );
        }),
      );
    },
    {
      dispatch: false,
    },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly productsDialogService: ProductsDialogService,
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
