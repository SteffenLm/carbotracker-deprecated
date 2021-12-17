import { MealEntry } from '../../../../model/meal-entry.models';
import { createAction, props } from '@ngrx/store';

export const navigateBack = createAction(
  '[Create Meal Entry Page] Navigate Back',
);

export const abortMealEntryCreation = createAction(
  '[Create Meal Entry Page] Abort Meal Entry Creation',
);

export const createMealEntry = createAction(
  '[Create Meal Entry Page] Create Meal Entry',
  props<{ mealEntry: MealEntry }>(),
);
