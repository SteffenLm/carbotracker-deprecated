import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { ProductsEntity } from './products.models';

export const init = createAction('[Products Page] Init');

export const addProduct = createAction(
  '[Products/API] Add Product',
  props<{ product: ProductsEntity }>(),
);

export const updateProduct = createAction(
  '[Products/API] Update Product',
  props<{ updatedProduct: Update<ProductsEntity> }>(),
);

export const updateSelectedProduct = createAction(
  '[Products/API] Update Selected Product',
  props<{ updatedProduct: Partial<ProductsEntity> }>(),
);

export const deleteProduct = createAction(
  '[Products/API] Delete Product',
  props<{ productId: string }>(),
);

export const deleteSelectedProduct = createAction(
  '[Products/API] Delete Selected Product',
);
