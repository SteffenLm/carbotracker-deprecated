export interface ProductFormValue {
  name: string;
  carbohydratesPer100Gram: string;
}

export const getPastaProductFormValue = (): ProductFormValue => ({
  name: 'Pasta',
  carbohydratesPer100Gram: '10',
});

export const getAppleProductFormValue = (): ProductFormValue => ({
  name: 'Apple',
  carbohydratesPer100Gram: '15',
});

export const getEmptyFormValue = (): ProductFormValue => ({
  name: '',
  carbohydratesPer100Gram: '',
});
