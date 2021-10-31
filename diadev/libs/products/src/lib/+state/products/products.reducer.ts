import { EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { productsEntityAdapter } from './products.entity-adapter';
import { ProductsEntity } from './products.models';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState extends EntityState<ProductsEntity> {
  selectedId: string | null;
  loaded: boolean;
  error: string | null;
}

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: ProductsState;
}

export const initialState: ProductsState =
  productsEntityAdapter.getInitialState({
    loaded: false,
    selectedId: null,
    error: null,
  });

const productsReducer = createReducer(
  initialState,
  on(
    ProductsActions.rehydrateProductsStateSuccess,
    (state, { productsState }): ProductsState => ({
      ...productsState,
      loaded: true,
      error: null,
    }),
  ),
  on(
    ProductsActions.addProduct,
    (state, { product }): ProductsState =>
      productsEntityAdapter.addOne(product, state),
  ),
  on(
    ProductsActions.updateProduct,
    (state, { updatedProduct: product }): ProductsState =>
      productsEntityAdapter.updateOne(product, state),
  ),
  on(ProductsActions.updateSelectedProduct, (state, action): ProductsState => {
    if (state.selectedId) {
      const { name, carbohydratesPer100Gram } = action.updatedProduct;
      return productsEntityAdapter.updateOne(
        {
          id: state.selectedId,
          changes: {
            name,
            carbohydratesPer100Gram,
          },
        },
        state,
      );
    } else {
      return state;
    }
  }),
  on(
    ProductsActions.deleteProduct,
    (state, { productId }): ProductsState =>
      productsEntityAdapter.removeOne(productId, state),
  ),
  on(ProductsActions.deleteSelectedProduct, (state): ProductsState => {
    if (state.selectedId) {
      return productsEntityAdapter.removeOne(state.selectedId as string, state);
    } else {
      return state;
    }
  }),
);

export function reducer(state: ProductsState | undefined, action: Action) {
  return productsReducer(state, action);
}
