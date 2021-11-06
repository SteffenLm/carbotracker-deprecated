import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as MealsActions from './meals.actions';
import { MealsEntity } from './meals.models';

export const MEALS_FEATURE_KEY = 'meals';

export interface State extends EntityState<MealsEntity> {
  selectedId?: string | number; // which Meals record has been selected
  loaded: boolean; // has the Meals list been loaded
  error?: string | null; // last known error (if any)
}

export interface MealsPartialState {
  readonly [MEALS_FEATURE_KEY]: State;
}

export const mealsAdapter: EntityAdapter<MealsEntity> =
  createEntityAdapter<MealsEntity>();

export const initialState: State = mealsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const mealsReducer = createReducer(
  initialState,
  on(MealsActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(MealsActions.loadMealsSuccess, (state, { meals }) =>
    mealsAdapter.setAll(meals, { ...state, loaded: true }),
  ),
  on(MealsActions.loadMealsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return mealsReducer(state, action);
}
