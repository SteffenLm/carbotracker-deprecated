import { createAction, props } from '@ngrx/store';
import { ProductsState } from '../../model/products-state.model';

export const saveProductStateToLocalStorageSuccess = createAction(
  '[Products | Local Storage API] Save Product State to LocalStorage Success',
);

export const saveProductStateToLocalStorageFailure = createAction(
  '[Products | Local Storage API] Save Product State to LocalStorage Failure',
);

export const loadProductStateFromLocalStorageSuccess = createAction(
  '[Products | Local Storage API] Load Product State from LocalStorage Success',
  props<{ productsState: ProductsState }>(),
);

export const loadProductStateFromLocalStorageFailure = createAction(
  '[Products | Local Storage API] Load Product State from LocalStorage Failure',
);
