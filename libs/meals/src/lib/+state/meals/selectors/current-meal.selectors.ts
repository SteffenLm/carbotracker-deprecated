import { createSelector } from '@ngrx/store';
import { CalculatedMealEntry } from '../../../model/calculated-meal-entry.model';
import { getEmptyMealEntry } from '../../../model/meal-entry.models';
import { selectMeals, selectMealEntities } from '../model/meals.entity-adapter';
import { selectCurrentMeal } from './meals-state.selectors';

export const selectMealEntries = createSelector(
  selectCurrentMeal,
  (currentMeal) => currentMeal.mealEntries,
);

export const selectAllMeals = createSelector(selectMealEntries, (mealEntries) =>
  selectMeals(mealEntries),
);

export const selectMealsEntities = createSelector(
  selectMealEntries,
  (mealEntries) => selectMealEntities(mealEntries),
);

export const selectSelectedMealEntryId = createSelector(
  selectCurrentMeal,
  (currentMeal) => currentMeal.selectedMealEntryId,
);

export const selectAllCalculatedMeals = createSelector(
  selectAllMeals,
  (mealEntries): CalculatedMealEntry[] =>
    mealEntries.map((mealEntry) => ({
      ...mealEntry,
      amountOfCarbohydratesInGramm:
        (mealEntry.amountInGramm * mealEntry.carbohydratesPer100Gram) / 100,
    })),
);

export const selectSelectedMealEntry = createSelector(
  selectMealsEntities,
  selectSelectedMealEntryId,
  (entities, selectedId) =>
    selectedId
      ? entities[selectedId] ?? getEmptyMealEntry()
      : getEmptyMealEntry(),
);

export const selectTotalCarbohydratesOfCurrenMeal = createSelector(
  selectAllCalculatedMeals,
  (mealEntries): number =>
    mealEntries
      .map((mealEntry) => mealEntry.amountOfCarbohydratesInGramm)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0),
);
