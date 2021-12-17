import { EntityState } from '@ngrx/entity';
import { MealEntry } from '../meal-entry.models';

export const MEALS_FEATURE_KEY = 'meals';

export interface MealsState extends EntityState<MealEntry> {
  selectedId: string | null;
  loaded: boolean;
  error: string | null;
}

export interface MealsPartialState {
  readonly [MEALS_FEATURE_KEY]: MealsState;
}
