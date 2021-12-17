import { EntityState } from '@ngrx/entity';
import { MealEntry } from '../../../model/meal-entry.models';

export const MEALS_FEATURE_KEY = 'meals';

export interface MealsState {
  currentMeal: {
    mealEntries: EntityState<MealEntry>;
    selectedMealEntry: string | null;
    error: string | null;
  };
  loaded: boolean;
  error: string | null;
}

export interface MealsPartialState {
  readonly [MEALS_FEATURE_KEY]: MealsState;
}
