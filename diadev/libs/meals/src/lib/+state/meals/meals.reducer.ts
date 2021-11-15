import { EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as MealsActions from './meals.actions';
import * as MealsPersistenceActions from './meals-persistence/meals-persistence.actions';
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

export const mealsReducer = createReducer(
  initialState,
  on(
    MealsPersistenceActions.rehydrateMealsStateSuccess,
    (state, { mealsState }): MealsState => {
      return {
        ...mealsState,
        loaded: true,
        error: null,
      };
    },
  ),
  on(MealsActions.createMeal, (state, action): MealsState => {
    return mealsEntityAdapter.addOne(action.meal, state);
  }),
);
