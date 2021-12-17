import { EntityState } from '@ngrx/entity';
import { MealsEntity } from '../meals.models';

export const MEALS_FEATURE_KEY = 'meals';

export interface MealsState extends EntityState<MealsEntity> {
  selectedId: string | null;
  loaded: boolean;
  error: string | null;
}

export interface MealsPartialState {
  readonly [MEALS_FEATURE_KEY]: MealsState;
}
