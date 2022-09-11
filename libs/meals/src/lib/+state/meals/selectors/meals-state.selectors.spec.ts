import {
  getEmptyMealsState,
  getPastaSampleMealsState,
  MealsState,
} from '../model/meals-state.model';
import {
  selectCurrentMeal,
  selectError,
  selectLoaded,
} from './meals-state.selectors';

describe('MealsSelectors', () => {
  describe('selectMealsLoaded', () => {
    it('should return false', () => {
      const givenState: MealsState = {
        ...getEmptyMealsState(),
        loaded: false,
      };

      const isLoaded = selectLoaded.projector(givenState);

      expect(isLoaded).toBeFalsy();
    });
    it('should return true', () => {
      const givenState: MealsState = {
        ...getEmptyMealsState(),
        loaded: true,
      };

      const isLoaded = selectLoaded.projector(givenState);

      expect(isLoaded).toBeTruthy();
    });
  });
  describe('selectMealsError', () => {
    it('should return "Unknown Error"', () => {
      const givenState: MealsState = {
        ...getEmptyMealsState(),
        error: 'Unknown Error',
      };

      const error = selectError.projector(givenState);

      expect(error).toBe(givenState.error);
    });
  });
  describe('selectCurrentMeal', () => {
    it('should return the currentMeal property', () => {
      const givenState: MealsState = getPastaSampleMealsState();

      const currentMeal = selectCurrentMeal.projector(givenState);

      expect(currentMeal).toBe(givenState.currentMeal);
    });
  });
});
