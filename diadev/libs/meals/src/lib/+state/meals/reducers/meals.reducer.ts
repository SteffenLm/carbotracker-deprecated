import { createReducer, on } from '@ngrx/store';

import { mealsEntityAdapter } from '../model/meals.entity-adapter';
import { MealsState } from '../model/meals-state.model';
import {
  CreateMealEntryPageActions,
  CurrentMealPageActions,
  EditMealEntryPageActions,
  LocalStorageApiActions,
} from '../actions';
import { Update } from '@ngrx/entity';
import { MealEntry } from '../../../model/meal-entry.models';

export const initialState: MealsState = {
  currentMeal: {
    mealEntries: mealsEntityAdapter.getInitialState(),
    error: null,
    selectedMealEntryId: null,
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
      return {
        ...mealsState,
        loaded: true,
        error: null,
        currentMeal: {
          ...mealsState.currentMeal,
          error: null,
        },
      };
    },
  ),
  on(CurrentMealPageActions.deleteCurrentMeal, (state): MealsState => {
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
  on(
    CurrentMealPageActions.selectMealEntry,
    (state, { mealEntryId }): MealsState => ({
      ...state,
      currentMeal: {
        ...state.currentMeal,
        selectedMealEntryId: mealEntryId,
      },
    }),
  ),
  on(EditMealEntryPageActions.updateMealEntry, (state, action): MealsState => {
    const updatedMealEntry: Update<MealEntry> = {
      id: action.mealEntryId,
      changes: {
        amountInGramm: action.amount,
      },
    };
    return {
      ...state,
      currentMeal: {
        ...state.currentMeal,
        selectedMealEntryId: null,
        mealEntries: mealsEntityAdapter.updateOne(
          updatedMealEntry,
          state.currentMeal.mealEntries,
        ),
      },
    };
  }),
  on(
    EditMealEntryPageActions.deleteMealEntry,
    (state, { mealEntryId }): MealsState => ({
      ...state,
      currentMeal: {
        ...state.currentMeal,
        selectedMealEntryId: null,
        mealEntries: mealsEntityAdapter.removeOne(
          mealEntryId,
          state.currentMeal.mealEntries,
        ),
      },
    }),
  ),
);
