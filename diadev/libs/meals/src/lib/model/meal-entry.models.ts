export interface MealEntry {
  id: string;
  name: string;
  carbohydratesPer100Gram: number;
  amountInGramm: number;
}

export const getPastaMealEntry = (): MealEntry => ({
  id: 'PASTA',
  name: 'Pasta',
  carbohydratesPer100Gram: 10,
  amountInGramm: 200,
});

export const getAppleMealEntry = (): MealEntry => ({
  id: 'APPLE',
  name: 'Apple',
  carbohydratesPer100Gram: 15,
  amountInGramm: 150,
});

export const getEmptyMealEntry = (): MealEntry => ({
  id: '',
  name: '',
  carbohydratesPer100Gram: 0,
  amountInGramm: 0,
});
