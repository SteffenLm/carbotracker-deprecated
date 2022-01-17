import { createAction, props } from '@ngrx/store';

export const createMealEntry = createAction(
  '[Current Meal Page] Create Meal Entry',
);

export const selectMealEntry = createAction(
  '[Current Meal Page] Select Meal Entry',
  props<{ mealEntryId: string }>(),
);

export const deleteCurrentMeal = createAction(
  '[Current Meal Page] Delete Current Meal',
);
