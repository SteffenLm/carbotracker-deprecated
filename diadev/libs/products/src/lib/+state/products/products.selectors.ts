import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  selectProductEntities,
  selectProducts,
} from './products.entity-adapter';
import { PRODUCTS_FEATURE_KEY, ProductsState } from './products.reducer';

export const selectProductsState =
  createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

export const selectProductsLoaded = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loaded,
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error,
);

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => selectProducts(state),
);

export const selectProductsEntities = createSelector(
  selectProductsState,
  (state: ProductsState) => selectProductEntities(state),
);

export const selectSelectedId = createSelector(
  selectProductsState,
  (state: ProductsState) => state.selectedId,
);

export const selectSelected = createSelector(
  selectProductsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
