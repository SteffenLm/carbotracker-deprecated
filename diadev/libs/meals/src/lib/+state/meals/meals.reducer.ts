import { EntityState } from '@ngrx/entity';
import { createReducer } from '@ngrx/store';

import { mealsEntityAdapter } from './meals.entity-adapter';
import { MealsEntity } from './meals.models';

export const MEALS_FEATURE_KEY = 'meals';

export interface MealsState extends EntityState<MealsEntity> {
  selectedId: string | null;
  loaded: boolean;
  error: string | null;
}

export interface MealsPartialState {
  readonly [MEALS_FEATURE_KEY]: MealsState;
}

export const initialState: MealsState = mealsEntityAdapter.getInitialState({
  selectedId: null,
  loaded: false,
  error: null,
});

export const mealsReducer = createReducer(initialState);
