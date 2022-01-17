import { createAction, props } from '@ngrx/store';
import { MealsState } from '../../model/meals-state.model';

export const saveProductStateToLocalStorageSuccess = createAction(
  '[Meals | Local Storage API] Save Meals State to LocalStorage Success',
);

export const saveProductStateToLocalStorageFailure = createAction(
  '[Meals | Local Storage API] Save Meals State to LocalStorage Failure',
);

export const loadProductStateFromLocalStorageSuccess = createAction(
  '[Meals | Local Storage API] Load Meals State from LocalStorage Success',
  props<{ mealsState: MealsState }>(),
);

export const loadProductStateFromLocalStorageFailure = createAction(
  '[Meals | Local Storage API] Load Meals State from LocalStorage Failure',
);
