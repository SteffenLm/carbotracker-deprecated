import { EntityState } from '@ngrx/entity';
import { getPastaMealEntry, MealEntry } from '../../../model/meal-entry.models';

export const MEALS_FEATURE_KEY = 'meals';

export interface CurrentMeal {
  mealEntries: EntityState<MealEntry>;
  selectedMealEntryId: string | null;
  error: string | null;
}

export interface MealsState {
  currentMeal: CurrentMeal;
  loaded: boolean;
  error: string | null;
}

export interface MealsPartialState {
  readonly [MEALS_FEATURE_KEY]: MealsState;
}

export const getEmptyMealsState = (): MealsState => ({
  loaded: false,
  error: null,
  currentMeal: {
    error: null,
    mealEntries: {
      ids: [],
      entities: {},
    },
    selectedMealEntryId: null,
  },
});

export const getPastaSampleMealsState = (): MealsState => ({
  loaded: false,
  error: null,
  currentMeal: {
    error: 'Unknown Error',
    mealEntries: {
      ids: [getPastaMealEntry().id],
      entities: {
        [getPastaMealEntry().id]: getPastaMealEntry(),
      },
    },
    selectedMealEntryId: getPastaMealEntry().id,
  },
});
