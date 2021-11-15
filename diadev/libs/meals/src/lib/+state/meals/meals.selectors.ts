import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectMealEntities, selectMeals } from './meals.entity-adapter';
import { MEALS_FEATURE_KEY, MealsState } from './meals.reducer';

export const selectMealsState =
  createFeatureSelector<MealsState>(MEALS_FEATURE_KEY);

export const selectMealsLoaded = createSelector(
  selectMealsState,
  (state: MealsState) => state.loaded,
);

export const selectMealsError = createSelector(
  selectMealsState,
  (state: MealsState) => state.error,
);

export const selectAllMeals = createSelector(
  selectMealsState,
  (state: MealsState) => selectMeals(state),
);

export const selectMealsEntities = createSelector(
  selectMealsState,
  (state: MealsState) => selectMealEntities(state),
);

export const selectSelectedId = createSelector(
  selectMealsState,
  (state: MealsState) => state.selectedId,
);

export const selectSelected = createSelector(
  selectMealsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
