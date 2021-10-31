import { ProductsState } from '../products/products.reducer';
import { createAction, props } from '@ngrx/store';

export const rehydrateProductsState = createAction(
  '[Products Persistence] Rehydrate Products State',
);

export const rehydrateProductsStateSuccess = createAction(
  '[Products Persistence] Rehydrate Products State Success',
  props<{ productsState: ProductsState }>(),
);

export const rehydrateProductsStateFailure = createAction(
  '[Products Persistence] Rehydrate Products State Failure',
);

export const hydrateProductsState = createAction(
  '[Products Persistence] Hydrate Products State',
  props<{ productsState: ProductsState }>(),
);

export const hydrateProductsStateSuccess = createAction(
  '[Products Persistence] Hydrate Products State Success',
);

export const hydrateProductsStateFailure = createAction(
  '[Products Persistence] Hydrate Products State Failure',
);
