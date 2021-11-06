import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { ProductsEntity } from './products.models';

export const init = createAction('[Products Page] Init');

export const createProduct = createAction(
  '[Products/API] Create Product',
  props<{ product: ProductsEntity }>(),
);

export const createProductSuccess = createAction(
  '[Products/API] Create Product Success',
  props<{ product: ProductsEntity }>(),
);

export const createProductFailure = createAction(
  '[Products/API] Create Product Failure',
);

export const updateProduct = createAction(
  '[Products/API] Update Product',
  props<{ updatedProduct: Update<ProductsEntity> }>(),
);

export const updateProductSuccess = createAction(
  '[Products/API] Update Product Success',
);

export const updateProductFailure = createAction(
  '[Products/API] Update Product Failure',
);

export const deleteProduct = createAction(
  '[Products/API] Delete Product',
  props<{ productId: string }>(),
);

export const deleteProductSuccess = createAction(
  '[Products/API] Delete Product Success',
  props<{ productId: string }>(),
);

export const deleteProductFailure = createAction(
  '[Products/API] Delete Product Failure',
  props<{ productId: string }>(),
);
