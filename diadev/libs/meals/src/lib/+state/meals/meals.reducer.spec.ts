import { Action } from '@ngrx/store';

import * as MealsActions from './meals.actions';
import { MealsEntity } from './meals.models';
import { MealsState, initialState, reducer } from './meals.reducer';

describe('Meals Reducer', () => {
  const createMealsEntity = (id: string, name = ''): MealsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Meals actions', () => {
    it('loadMealsSuccess should return the list of known Meals', () => {
      const meals = [
        createMealsEntity('PRODUCT-AAA'),
        createMealsEntity('PRODUCT-zzz'),
      ];
      const action = MealsActions.loadMealsSuccess({ meals });

      const result: MealsState = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
