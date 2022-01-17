import { Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { productsEntityAdapter } from '../model/products.entity-adapter';
import { ProductsEntity } from '../../../model/products-entity.model';
import {
  ProductCreatePageActions,
  ProductEditPageActions,
} from '../actions/ui';
import { LocalStorageApiActions } from '../actions/api';
import { ProductsState } from '../model/products-state.model';

export const initialState: ProductsState =
  productsEntityAdapter.getInitialState({
    loaded: false,
    selectedId: null,
    error: null,
  });

export const productsReducer = createReducer(
  initialState,
  on(
    LocalStorageApiActions.loadProductStateFromLocalStorageSuccess,
    (state, { productsState }): ProductsState => ({
      ...productsState,
      loaded: true,
      error: null,
    }),
  ),
  on(
    ProductCreatePageActions.saveProduct,
    (state, { product }): ProductsState =>
      productsEntityAdapter.addOne(product, state),
  ),
  on(
    ProductEditPageActions.updateProduct,
    (state, { updatedProduct }): ProductsState => {
      const product: Update<ProductsEntity> = {
        id: updatedProduct.id,
        changes: {
          ...updatedProduct,
        },
      };
      return productsEntityAdapter.updateOne(product, state);
    },
  ),
  on(
    ProductEditPageActions.deleteProduct,
    (state, { productId }): ProductsState =>
      productsEntityAdapter.removeOne(productId, state),
  ),
);
