import { Dictionary } from '@ngrx/entity';
import {
  CalculatedMealEntry,
  getAppleCalculatedMealEntry,
  getPastaCalculatedMealEntry,
} from '../../../model/calculated-meal-entry.model';
import {
  getEmptyMealEntry,
  getPastaMealEntry,
  MealEntry,
} from '../../../model/meal-entry.models';
import { CurrentMeal } from '../model/meals-state.model';
import { CurrentMealSelectors } from './index';

describe('Meals Selectors', () => {
  describe('selectTotalCarbohydratesOfCurrenMeal', () => {
    describe('when no meal entries exist', () => {
      it('should return 0', () => {
        const givenMealEntries: CalculatedMealEntry[] = [];
        const totalNumberOfCarbohydrates =
          CurrentMealSelectors.selectTotalCarbohydratesOfCurrenMeal.projector(
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
          CurrentMealSelectors.selectTotalCarbohydratesOfCurrenMeal.projector(
            givenMealEntries,
          );
        expect(totalNumberOfCarbohydrates).toEqual(38);
      });
    });
  });
  describe('selectSelectedMealEntry', () => {
    let givenMealEntries: Dictionary<MealEntry>;
    let givenIdOfSelectedMealEntry: string | null;
    describe('when a selected id it exists', () => {
      beforeEach(() => {
        givenIdOfSelectedMealEntry = getPastaMealEntry().id;
      });
      describe('and the related entity exists', () => {
        beforeEach(() => {
          givenMealEntries = {
            [getPastaMealEntry().id]: getPastaMealEntry(),
          };
        });
        it('should return this entity', () => {
          const resultEntity =
            CurrentMealSelectors.selectSelectedMealEntry.projector(
              givenMealEntries,
              givenIdOfSelectedMealEntry,
            );

          expect(resultEntity).toEqual(getPastaMealEntry());
        });
      });
      describe('and the related entity does not exist', () => {
        beforeEach(() => {
          givenMealEntries = {};
        });
        it('should return the empty meal entry', () => {
          const resultEntity =
            CurrentMealSelectors.selectSelectedMealEntry.projector(
              givenMealEntries,
              givenIdOfSelectedMealEntry,
            );

          expect(resultEntity).toEqual(getEmptyMealEntry());
        });
      });
    });
    describe('when a selected id does not exist', () => {
      beforeEach(() => {
        givenIdOfSelectedMealEntry = null;
      });
      it('should return the empty meal entry', () => {
        const resultEntity =
          CurrentMealSelectors.selectSelectedMealEntry.projector(
            null,
            givenIdOfSelectedMealEntry,
          );
        expect(resultEntity).toEqual(getEmptyMealEntry());
      });
    });
  });
  describe('selectIdOfSelectedMealEntry', () => {
    it('should return the value of the selectedMealEntry proeprty', () => {
      const givenCurrentMeal: Pick<CurrentMeal, 'selectedMealEntryId'> = {
        selectedMealEntryId: 'ID',
      };

      const resultId =
        CurrentMealSelectors.selectSelectedMealEntryId.projector(
          givenCurrentMeal,
        );

      expect(resultId).toEqual('ID');
    });
  });
});
