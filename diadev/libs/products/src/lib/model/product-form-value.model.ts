export interface ProductFormValue {
  name: string;
  carbohydratesPer100Gram: string;
}

export const getPastaFormValue = (): ProductFormValue => ({
  name: 'Pasta',
  carbohydratesPer100Gram: '10',
});

export const getEmptyFormValue = (): ProductFormValue => ({
  name: '',
  carbohydratesPer100Gram: '',
});
