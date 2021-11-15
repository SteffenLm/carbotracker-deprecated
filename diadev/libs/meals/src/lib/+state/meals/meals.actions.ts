import { createAction, props } from '@ngrx/store';
import { MealsEntity } from './meals.models';

export const init = createAction('[Meals Page] Init');

export const createMeal = createAction(
  '[Meals/API] Create Meal',
  props<{ meal: MealsEntity }>(),
);

export const createMealSuccess = createAction(
  '[Meals/API] Create Meal Success',
  props<{ meal: MealsEntity }>(),
);

export const createMealFailure = createAction(
  '[Meals/API] Create Meal Failure',
);

export const deleteCurrentMeal = createAction(
  '[Meals/API] Delete Current Meal',
);

export const deleteCurrentMealSuccess = createAction(
  '[Meals/API] Delete Current Meal Success',
);

export const deleteCurrentMealFailure = createAction(
  '[Meals/API] Delete Current Meal Failure',
);
