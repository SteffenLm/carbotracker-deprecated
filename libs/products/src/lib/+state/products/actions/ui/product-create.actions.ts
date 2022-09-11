import { createAction, props } from '@ngrx/store';
import { ProductsEntity } from '../../../../model/products-entity.model';

export const saveProduct = createAction(
  '[Product Create Page] Save Product',
  props<{ product: ProductsEntity }>(),
);

export const abortProductCreation = createAction(
  '[Product Create Page] Abort Product Creation',
);

export const navigateBack = createAction('[Product Create Page] Navigate Back');
