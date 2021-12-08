import { getEmptyProductsEntity, ProductsEntity } from '../products.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectProductId } from './products.route.selectors';
import {
  selectProductEntities,
  selectProducts,
} from '../model/products.entity-adapter';
import {
  ProductsState,
  PRODUCTS_FEATURE_KEY,
} from '../model/products-state.model';

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
  selectProductId,
  (entities, selectedId) =>
    selectedId
      ? (entities[selectedId] as ProductsEntity)
      : getEmptyProductsEntity(),
);
