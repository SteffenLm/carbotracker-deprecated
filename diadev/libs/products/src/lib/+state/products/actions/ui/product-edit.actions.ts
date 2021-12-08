import { createAction, props } from '@ngrx/store';
import { ProductsEntity } from '../../products.models';

export const updateProduct = createAction(
  '[Product Edit Page] Update Product',
  props<{ updatedProduct: ProductsEntity }>(),
);

export const deleteProduct = createAction(
  '[Product Edit Page] Delete Product',
  props<{ productId: string }>(),
);

export const navigateBack = createAction('[Product Edit Page] Navigate Back');
