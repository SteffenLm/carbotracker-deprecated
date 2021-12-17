import { EntityState } from '@ngrx/entity';
import { MealsEntity } from '../meals.models';
import { MEALS_FEATURE_KEY } from '../meals.reducer';

export interface MealsState extends EntityState<MealsEntity> {
  selectedId: string | null;
  loaded: boolean;
  error: string | null;
}

export interface MealsPartialState {
  readonly [MEALS_FEATURE_KEY]: MealsState;
}
