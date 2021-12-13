import { createAction } from '@ngrx/store';

export const createMealEntry = createAction(
  '[Current Meal Page] Create Meal Entry',
);

export const selectMealEntry = createAction(
  '[Current Meal Page] Select Meal Entry',
);

export const deletCurrentMeal = createAction(
  '[Current Meal Page] Delete Current Meal',
);
