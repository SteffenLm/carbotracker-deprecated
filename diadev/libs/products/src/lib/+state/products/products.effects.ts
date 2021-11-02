import { Injectable } from '@angular/core';
import { ActionCreator, Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as ProductsActions from './products.actions';
import * as ProductsPersistenceActions from '../products-persistence/products-persistence.actions';
import * as ProductsSelectors from './products.selectors';
import { ProductsState } from './products.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { TypedAction } from '@ngrx/store/src/models';

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

  deleteProductSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsPersistenceActions.hydrateProductsStateSuccess),
        filter(
          ({ sourceAction }) =>
            sourceAction.type === ProductsActions.deleteProduct.type,
        ),
        tap(() => this.openSnackBar('product deleted')),
        tap(() => this.navigateToProductsList()),
      );
    },
    { dispatch: false },
  );

  deleteProductFailure = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsPersistenceActions.hydrateProductsStateFailure),
        filter((action) =>
          this.IsAction(action.sourceAction, ProductsActions.deleteProduct),
        ),
        tap(() => this.openSnackBar('product deletion failed')),
      );
    },
    { dispatch: false },
  );

  createProductSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsPersistenceActions.hydrateProductsStateSuccess),
        filter((action) =>
          this.IsAction(action.sourceAction, ProductsActions.createProduct),
        ),
        tap(() => this.openSnackBar(`product created`)),
        tap(() => this.navigateToProductsList()),
      );
    },
    { dispatch: false },
  );

  createProductFailure = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsPersistenceActions.hydrateProductsStateFailure),
        filter((action) =>
          this.IsAction(action.sourceAction, ProductsActions.createProduct),
        ),
        tap(() => this.openSnackBar('product creation failed')),
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

  private openSnackBar(message: string) {
    this.matSnackBar.open(message);
  }

  private navigateToProductsList(): void {
    this.router.navigate(['../'], {
      relativeTo: this.route,
    });
  }

  private IsAction(
    sourceAction: TypedAction<string>,
    filteringAction: ActionCreator,
  ) {
    return sourceAction.type === filteringAction.type;
  }
}
