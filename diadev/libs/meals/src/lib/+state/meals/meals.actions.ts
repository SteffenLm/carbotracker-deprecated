import { createAction, props } from '@ngrx/store';
import { MealsEntity } from './meals.models';

export const init = createAction('[Meals Page] Init');

export const loadMealsSuccess = createAction(
  '[Meals/API] Load Meals Success',
  props<{ meals: MealsEntity[] }>(),
);

export const loadMealsFailure = createAction(
  '[Meals/API] Load Meals Failure',
  props<{ error: any }>(),
);
