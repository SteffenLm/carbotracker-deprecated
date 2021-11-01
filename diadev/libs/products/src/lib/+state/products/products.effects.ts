import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as ProductsActions from './products.actions';
import * as ProductsPersistenceActions from '../products-persistence/products-persistence.actions';
import * as ProductsSelectors from './products.selectors';
import { ProductsState } from './products.reducer';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ProductsEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.init),
      switchMap(() => {
        return of(ProductsPersistenceActions.rehydrateProductsState());
      }),
    );
  });

  editProductsState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ProductsActions.createProduct,
        ProductsActions.deleteProduct,
        ProductsActions.updateProduct,
        ProductsActions.deleteSelectedProduct,
      ),
      concatLatestFrom(() => this.selectProductState()),
      map(([action, productsState]) =>
        ProductsPersistenceActions.hydrateProductsState({
          productsState,
          sourceAction: action,
        }),
      ),
    );
  });

  createProductSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsPersistenceActions.hydrateProductsStateSuccess),
        filter(
          (action) =>
            action.sourceAction.type === ProductsActions.createProduct.type,
        ),
        tap(() => this.matSnackBar.open(`product created`)),
        tap(() => {
          console.log(this.route);
          this.router.navigate([''], {
            relativeTo: this.route,
          });
        }),
      );
    },
    { dispatch: false },
  );

  createProductFailure = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsActions.createProductFailure),
        tap(() => this.matSnackBar.open(`product creation failed`)),
      );
    },
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly matSnackBar: MatSnackBar,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  private selectProductState(): Observable<ProductsState> {
    return this.store.select(ProductsSelectors.selectProductsState);
  }
}
