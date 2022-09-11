import { createAction, props } from '@ngrx/store';

export const createProduct = createAction('[Product List Page] Create Product');

export const selectProduct = createAction(
  '[Product List Page] Select Product',
  props<{ productId: string }>(),
);
