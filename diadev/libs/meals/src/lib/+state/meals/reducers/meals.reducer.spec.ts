import { getPastaMealEntry } from '../../../model/meal-entry.models';
import {
  CreateMealEntryPageActions,
  CurrentMealPageActions,
  EditMealEntryPageActions,
  LocalStorageApiActions,
} from '../actions';
import {
  getEmptyMealsState,
  getPastaSampleMealsState,
  MealsState,
} from '../model/meals-state.model';
import { mealsReducer, initialState } from './meals.reducer';

describe('MealsReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = mealsReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });

  describe('CreateMealEntryPageActions', () => {
    describe('createMealEntry', () => {
      it('should add a new entry to the existing state', () => {
        const action = CreateMealEntryPageActions.createMealEntry({
          mealEntry: getPastaMealEntry(),
        });
        const newState = mealsReducer(initialState, action);
        const mealEntries = newState.currentMeal.mealEntries;
        expect(mealEntries.ids.length).toEqual(1);
        expect(mealEntries.ids[0]).toEqual(getPastaMealEntry().id);
        expect(mealEntries.entities[getPastaMealEntry().id]).toEqual(
          getPastaMealEntry(),
        );
      });
    });
  });

  describe('LocalStorageApiActions', () => {
    describe('loadProductStateFromLocalStorageSuccess', () => {
      let newState: MealsState;
      beforeEach(() => {
        const action =
          LocalStorageApiActions.loadProductStateFromLocalStorageSuccess({
            mealsState: getPastaSampleMealsState(),
          });
        newState = mealsReducer(initialState, action);
      });
      it('should set the meal entries', () => {
        expect(newState.currentMeal.mealEntries).toEqual(
          getPastaSampleMealsState().currentMeal.mealEntries,
        );
      });
      it('should set current meal errors to null', () => {
        expect(newState.currentMeal.error).toBeNull();
      });
      it('should not touch the selectedMealEntry', () => {
        expect(newState.currentMeal.selectedMealEntryId).toEqual(
          getPastaSampleMealsState().currentMeal.selectedMealEntryId,
        );
      });
      it('should set state errors to null', () => {
        expect(newState.error).toBeNull();
      });
      it('should set loaded to true', () => {
        expect(newState.loaded).toBeTruthy();
      });
    });
  });
  describe('CurrentMealPageActions', () => {
    describe('deleteCurrentMeal', () => {
      let newState: MealsState;
      beforeEach(() => {
        newState = mealsReducer(
          getPastaSampleMealsState(),
          CurrentMealPageActions.deleteCurrentMeal(),
        );
      });
      it('should remove all meal entries frmm the current Meal collection', () => {
        expect(newState.currentMeal.mealEntries.ids.length).toEqual(0);
        expect(newState.currentMeal.mealEntries.entities).toEqual({});
      });
    });

    describe('selectMealEntry', () => {
      let newState: MealsState;
      beforeEach(() => {
        newState = mealsReducer(
          getEmptyMealsState(),
          CurrentMealPageActions.selectMealEntry({
            mealEntryId: getPastaMealEntry().id,
          }),
        );
      });
      it('should set the selectedMealEntry property', () => {
        expect(newState.currentMeal.selectedMealEntryId).toEqual(
          getPastaMealEntry().id,
        );
      });
    });
  });

  describe('EditMealEntryPageActions', () => {
    describe('updateMealEntry', () => {
      let newState: MealsState;
      beforeEach(() => {
        newState = mealsReducer(
          getPastaSampleMealsState(),
          EditMealEntryPageActions.updateMealEntry({
            amount: 19,
            mealEntryId: getPastaMealEntry().id,
          }),
        );
      });
      it('should set selected meal entry to null', () => {
        expect(newState.currentMeal.selectedMealEntryId).toBeNull();
      });
      it('should update the amount of the pasta meal entry', () => {
        expect(
          newState.currentMeal.mealEntries.entities[getPastaMealEntry().id]
            ?.amountInGramm,
        ).toEqual(19);
      });
    });

    describe('deleteMealEntry', () => {
      let newState: MealsState;
      beforeEach(() => {
        newState = mealsReducer(
          getPastaSampleMealsState(),
          EditMealEntryPageActions.deleteMealEntry({
            mealEntryId: getPastaMealEntry().id,
          }),
        );
      });
      it('should remove the pasta meal entry', () => {
        expect(newState.currentMeal.mealEntries.ids.length).toEqual(0);
        expect(newState.currentMeal.mealEntries.entities).toEqual({});
      });
      it('should set selected meal entry to null', () => {
        expect(newState.currentMeal.selectedMealEntryId).toBeNull();
      });
    });
  });
});
