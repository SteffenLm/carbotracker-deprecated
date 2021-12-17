import { createReducer, on } from '@ngrx/store';

import { mealsEntityAdapter } from '../model/meals.entity-adapter';
import { MealsState } from '../model/meals-state.model';
import {
  CreateMealEntryPageActions,
  CurrentMealPageActions,
  LocalStorageApiActions,
} from '../actions';

export const initialState: MealsState = {
  currentMeal: {
    mealEntries: mealsEntityAdapter.getInitialState(),
    error: null,
    selectedMealEntry: null,
  },
  loaded: false,
  error: null,
};

export const mealsReducer = createReducer(
  initialState,
  on(
    CreateMealEntryPageActions.createMealEntry,
    (state, { mealEntry }): MealsState => {
      return {
        ...state,
        currentMeal: {
          ...state.currentMeal,
          mealEntries: mealsEntityAdapter.addOne(
            mealEntry,
            state.currentMeal.mealEntries,
          ),
        },
      };
    },
  ),
  on(
    LocalStorageApiActions.loadProductStateFromLocalStorageSuccess,
    (state, { mealsState }): MealsState => {
      return mealsState;
    },
  ),
  on(CurrentMealPageActions.deletCurrentMeal, (state): MealsState => {
    return {
      ...state,
      currentMeal: {
        ...state.currentMeal,
        mealEntries: mealsEntityAdapter.removeAll(
          state.currentMeal.mealEntries,
        ),
      },
    };
  }),
);
