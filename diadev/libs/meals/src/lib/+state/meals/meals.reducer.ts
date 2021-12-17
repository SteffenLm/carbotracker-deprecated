import { createReducer } from '@ngrx/store';

import { mealsEntityAdapter } from './model/meals.entity-adapter';
import { MealsState } from './model/meals-state.model';

export const initialState: MealsState = mealsEntityAdapter.getInitialState({
  selectedId: null,
  loaded: false,
  error: null,
});

export const mealsReducer = createReducer(initialState);
