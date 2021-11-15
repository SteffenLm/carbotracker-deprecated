export interface MealsEntity {
  id: string;
  name: string;
  carbohydratesPer100Gram: number;
  amountInGramm: number;
}

export const getPastaMealsEntity = (): MealsEntity => ({
  id: 'PASTA',
  name: 'Pasta',
  carbohydratesPer100Gram: 10,
  amountInGramm: 200,
});

export const getAppleMealsEntity = (): MealsEntity => ({
  id: 'APPLE',
  name: 'Apple',
  carbohydratesPer100Gram: 15,
  amountInGramm: 150,
});

export const getEmptyMealsEntity = (): MealsEntity => ({
  id: '',
  name: '',
  carbohydratesPer100Gram: 0,
  amountInGramm: 0,
});
