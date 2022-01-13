import {
  CalculatedMealEntry,
  getAppleCalculatedMealEntry,
  getPastaCalculatedMealEntry,
} from '../../../model/calculated-meal-entry.model';
import { getPastaMealEntry } from '../../../model/meal-entry.models';
import { MealsSelectors } from './index';

describe('Meals Selectors', () => {
  describe('selectTotalCarbohydratesOfCurrenMeal', () => {
    describe('when no meal entries exist', () => {
      it('should return 0', () => {
        const givenMealEntries: CalculatedMealEntry[] = [];
        const totalNumberOfCarbohydrates =
          MealsSelectors.selectTotalCarbohydratesOfCurrenMeal.projector(
            givenMealEntries,
          );
        expect(totalNumberOfCarbohydrates).toEqual(0);
      });
    });

    describe('when apple and pasta meal entries exist', () => {
      it('should return 38', () => {
        const givenMealEntries: CalculatedMealEntry[] = [
          getPastaCalculatedMealEntry(),
          getAppleCalculatedMealEntry(),
        ];
        const totalNumberOfCarbohydrates =
          MealsSelectors.selectTotalCarbohydratesOfCurrenMeal.projector(
            givenMealEntries,
          );
        expect(totalNumberOfCarbohydrates).toEqual(38);
      });
    });
  });
});
