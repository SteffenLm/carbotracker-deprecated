import {
  getAppleMealEntry,
  getPastaMealEntry,
  MealEntry,
} from './meal-entry.models';

export interface CalculatedMealEntry extends MealEntry {
  amountOfCarbohydratesInGramm: number;
}

export const getPastaCalculatedMealEntry = (): CalculatedMealEntry => ({
  ...getPastaMealEntry(),
  amountOfCarbohydratesInGramm: 20,
});

export const getAppleCalculatedMealEntry = (): CalculatedMealEntry => ({
  ...getAppleMealEntry(),
  amountOfCarbohydratesInGramm: 18,
});
