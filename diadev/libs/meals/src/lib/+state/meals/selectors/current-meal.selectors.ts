import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CalculatedMealEntry } from '../../../model/calculated-meal-entry.model';
import { getEmptyMealEntry } from '../../../model/meal-entry.models';
import { MealsState, MEALS_FEATURE_KEY } from '../model/meals-state.model';
import { selectMeals, selectMealEntities } from '../model/meals.entity-adapter';

export const selectMealsState =
  createFeatureSelector<MealsState>(MEALS_FEATURE_KEY);

export const selectMealsLoaded = createSelector(
  selectMealsState,
  (state: MealsState) => state.loaded,
);

export const selectMealsError = createSelector(
  selectMealsState,
  (state: MealsState) => state.error,
);

export const selectCurrentMeal = createSelector(
  selectMealsState,
  (state: MealsState) => state.currentMeal,
);

export const selectMealEntriesOfCurrentMeal = createSelector(
  selectCurrentMeal,
  (currentMeal) => currentMeal.mealEntries,
);

export const selectAllMeals = createSelector(
  selectMealEntriesOfCurrentMeal,
  (mealEntries) => selectMeals(mealEntries),
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

export const selectMealsEntities = createSelector(
  selectMealEntriesOfCurrentMeal,
  (mealEntries) => selectMealEntities(mealEntries),
);

export const selectIdOfSelectedMealEntry = createSelector(
  selectCurrentMeal,
  (currentMeal) => currentMeal.selectedMealEntry,
);

export const selectSelectedMealEntry = createSelector(
  selectMealsEntities,
  selectIdOfSelectedMealEntry,
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
