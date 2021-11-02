import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MEALS_FEATURE_KEY, State, mealsAdapter } from './meals.reducer';

// Lookup the 'Meals' feature state managed by NgRx
export const getMealsState = createFeatureSelector<State>(MEALS_FEATURE_KEY);

const { selectAll, selectEntities } = mealsAdapter.getSelectors();

export const getMealsLoaded = createSelector(
  getMealsState,
  (state: State) => state.loaded,
);

export const getMealsError = createSelector(
  getMealsState,
  (state: State) => state.error,
);

export const getAllMeals = createSelector(getMealsState, (state: State) =>
  selectAll(state),
);

export const getMealsEntities = createSelector(getMealsState, (state: State) =>
  selectEntities(state),
);

export const getSelectedId = createSelector(
  getMealsState,
  (state: State) => state.selectedId,
);

export const getSelected = createSelector(
  getMealsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
