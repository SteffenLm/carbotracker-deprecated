import { createAction, props } from '@ngrx/store';
import { ProductsEntity } from '../../../../model/products-entity.model';

export const updateProduct = createAction(
  '[Product Edit Page] Update Product',
  props<{ updatedProduct: ProductsEntity }>(),
);

export const deleteProduct = createAction(
  '[Product Edit Page] Delete Product',
  props<{ productId: string }>(),
);

export const navigateBack = createAction('[Product Edit Page] Navigate Back');

export const goBackToProducts = createAction(
  '[Product Edit Page | Product Not Found] Go Back to Products',
);
