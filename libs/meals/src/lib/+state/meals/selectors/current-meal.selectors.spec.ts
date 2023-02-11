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
import {
  CurrentMeal,
  getPastaSampleMealsState,
} from '../model/meals-state.model';
import {
  selectAllCalculatedMeals,
  selectAllMeals,
  selectMealEntries,
  selectMealsEntities,
  selectSelectedMealEntry,
  selectSelectedMealEntryId,
  selectTotalCarbohydratesOfCurrenMeal,
} from './current-meal.selectors';

describe('CurrentMealSelectors', () => {
  describe('selectMealEntries', () => {
    const samplePastaMealState = getPastaSampleMealsState();

    const mealEntries = selectMealEntries.projector(
      samplePastaMealState.currentMeal,
    );

    expect(mealEntries).toBe(samplePastaMealState.currentMeal.mealEntries);
  });
  describe('selectAllMeals', () => {
    it('should return an array with the pasta meal entry', () => {
      const samplePastaMealState = getPastaSampleMealsState();

      const allMeals = selectAllMeals.projector(
        samplePastaMealState.currentMeal.mealEntries,
      );

      expect(allMeals).toEqual([getPastaMealEntry()]);
    });
  });
  describe('selectMealsEntities', () => {
    it('should return the entities property', () => {
      const samplePastaMealState = getPastaSampleMealsState();

      const entities = selectMealsEntities.projector(
        samplePastaMealState.currentMeal.mealEntries,
      );

      expect(entities).toBe(
        samplePastaMealState.currentMeal.mealEntries.entities,
      );
    });
  });
  describe('selectSelectedMealEntryId', () => {
    it('should return "PASTA"', () => {
      const currentMeal: Pick<CurrentMeal, 'selectedMealEntryId'> = {
        selectedMealEntryId: getPastaMealEntry().id,
      };

      const id = selectSelectedMealEntryId.projector(currentMeal as CurrentMeal);

      expect(id).toEqual(getPastaMealEntry().id);
    });
  });
  describe('selectAllCalculatedMeals', () => {
    const calculatedMeals = selectAllCalculatedMeals.projector([
      getPastaMealEntry(),
    ]);
    expect(calculatedMeals).toEqual([getPastaCalculatedMealEntry()]);
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
          const resultEntity = selectSelectedMealEntry.projector(
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
          const resultEntity = selectSelectedMealEntry.projector(
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
        const resultEntity = selectSelectedMealEntry.projector(
          null as unknown as Dictionary<MealEntry>,
          givenIdOfSelectedMealEntry,
        );
        expect(resultEntity).toEqual(getEmptyMealEntry());
      });
    });
  });
  describe('selectTotalCarbohydratesOfCurrenMeal', () => {
    describe('when no meal entries exist', () => {
      it('should return 0', () => {
        const givenMealEntries: CalculatedMealEntry[] = [];
        const totalNumberOfCarbohydrates =
          selectTotalCarbohydratesOfCurrenMeal.projector(givenMealEntries);
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
          selectTotalCarbohydratesOfCurrenMeal.projector(givenMealEntries);
        expect(totalNumberOfCarbohydrates).toEqual(38);
      });
    });
  });
});
