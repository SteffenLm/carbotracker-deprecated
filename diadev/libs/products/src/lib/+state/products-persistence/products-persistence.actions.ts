import { ProductsState } from '../products/products.reducer';
import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

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
  props<{
    productsState: ProductsState;
    sourceAction: TypedAction<string>;
  }>(),
);

export const hydrateProductsStateSuccess = createAction(
  '[Products Persistence] Hydrate Products State Success',
  props<{ sourceAction: TypedAction<string> }>(),
);

export const hydrateProductsStateFailure = createAction(
  '[Products Persistence] Hydrate Products State Failure',
  props<{ sourceAction: TypedAction<string> }>(),
);
