import { EntityState } from '@ngrx/entity';
import { ProductsEntity } from '../../../model/products-entity.model';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState extends EntityState<ProductsEntity> {
  selectedId: string | null;
  loaded: boolean;
  error: string | null;
}

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: ProductsState;
}
