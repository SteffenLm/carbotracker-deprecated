import { ProductsEntity } from '../../../model/products-entity.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const productsEntityAdapter: EntityAdapter<ProductsEntity> =
  createEntityAdapter<ProductsEntity>();

const { selectIds, selectEntities, selectAll, selectTotal } =
  productsEntityAdapter.getSelectors();

export const selectProductIds = selectIds;
export const selectProductEntities = selectEntities;
export const selectProducts = selectAll;
export const selectProductsTotal = selectTotal;
