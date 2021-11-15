import { MealsEntity } from './meals.models';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const mealsEntityAdapter: EntityAdapter<MealsEntity> =
  createEntityAdapter<MealsEntity>();

const { selectIds, selectEntities, selectAll, selectTotal } =
  mealsEntityAdapter.getSelectors();

export const selectMealIds = selectIds;
export const selectMealEntities = selectEntities;
export const selectMeals = selectAll;
export const selectMealsTotal = selectTotal;
