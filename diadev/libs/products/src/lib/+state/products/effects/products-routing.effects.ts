import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  ProductCreatePageActions,
  ProductEditPageActions,
  ProductListPageActions,
} from '@diadev/products';
import { ProductsRoutingService } from '../../../services/products-routing.service';

@Injectable()
export class ProductsRoutingEffects {
  routeToProductsPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          ProductEditPageActions.deleteProduct,
          ProductEditPageActions.navigateBack,
          ProductEditPageActions.updateProduct,
          ProductEditPageActions.goBackToProducts,
          ProductCreatePageActions.abortProductCreation,
          ProductCreatePageActions.navigateBack,
          ProductCreatePageActions.saveProduct,
        ),
        tap(() => this.productsRoutingService.navigateToProductsPage()),
      );
    },
    { dispatch: false },
  );

  routeToEditPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductListPageActions.selectProduct),
        tap(({ productId }) =>
          this.productsRoutingService.navigateToEditPage(productId),
        ),
      );
    },
    { dispatch: false },
  );

  routeToCreatePage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductListPageActions.createProduct),
        tap(() => this.productsRoutingService.navigateToCreatePage()),
      );
    },
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly productsRoutingService: ProductsRoutingService,
  ) {}
}
