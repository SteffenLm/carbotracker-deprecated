import { createAction, props } from '@ngrx/store';

export const navigateBack = createAction(
  '[Edit Meal Entry Page] Navigate Back',
);

export const deleteMealEntry = createAction(
  '[Edit Meal Entry Page] Delete Meal Entry',
  props<{ mealEntryId: string }>(),
);

export const updateMealEntry = createAction(
  '[Edit Meal Entry Page] Update Meal Entry',
  props<{ mealEntryId: string; amount: number }>(),
);
