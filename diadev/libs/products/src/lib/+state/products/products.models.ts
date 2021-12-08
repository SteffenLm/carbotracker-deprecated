export interface ProductsEntity {
  id: string;
  name: string;
  carbohydratesPer100Gram: number;
}

export const getPastaProductsEntity = (): ProductsEntity => ({
  id: 'PASTA',
  name: 'Pasta',
  carbohydratesPer100Gram: 10,
});

export const getAppleProductsEntity = (): ProductsEntity => ({
  id: 'APPLE',
  name: 'Apple',
  carbohydratesPer100Gram: 15,
});

export const getEmptyProductsEntity = (): ProductsEntity => ({
  id: '',
  name: '',
  carbohydratesPer100Gram: 0,
});

// publicloaded$ = this.store.select(ProductsSelectors.selectProductsLoaded);
// allProducts$ = this.store.select(ProductsSelectors.selectAllProducts);
// selectedProducts$ = this.store.select(ProductsSelectors.selectSelected);
