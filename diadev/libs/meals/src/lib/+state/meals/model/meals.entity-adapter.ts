import { MealEntry } from '../../../model/meal-entry.models';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const mealsEntityAdapter: EntityAdapter<MealEntry> =
  createEntityAdapter<MealEntry>();

const { selectIds, selectEntities, selectAll, selectTotal } =
  mealsEntityAdapter.getSelectors();

export const selectMealIds = selectIds;
export const selectMealEntities = selectEntities;
export const selectMeals = selectAll;
export const selectMealsTotal = selectTotal;
