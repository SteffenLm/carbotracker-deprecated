import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MealsState, MEALS_FEATURE_KEY } from '../model/meals-state.model';

export const selectMealsState =
  createFeatureSelector<MealsState>(MEALS_FEATURE_KEY);

export const selectLoaded = createSelector(
  selectMealsState,
  (state: MealsState) => state.loaded,
);

export const selectError = createSelector(
  selectMealsState,
  (state: MealsState) => state.error,
);

export const selectCurrentMeal = createSelector(
  selectMealsState,
  (state: MealsState) => state.currentMeal,
);
