import { createReducer } from '@ngrx/store';

import { mealsEntityAdapter } from '../model/meals.entity-adapter';
import { MealsState } from '../model/meals-state.model';

export const initialState: MealsState = {
  currentMeal: {
    mealEntries: mealsEntityAdapter.getInitialState(),
    error: null,
    selectedMealEntry: null,
  },
  loaded: false,
  error: null,
};

export const mealsReducer = createReducer(initialState);
