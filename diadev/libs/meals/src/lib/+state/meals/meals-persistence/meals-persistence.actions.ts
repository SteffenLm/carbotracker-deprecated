import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { MealsState } from '../meals.reducer';

export const rehydrateMealsState = createAction(
  '[Meals Persistence] Rehydrate Meals State',
);

export const rehydrateMealsStateSuccess = createAction(
  '[Meals Persistence] Rehydrate Meals State Success',
  props<{ mealsState: MealsState }>(),
);

export const rehydrateMealsStateFailure = createAction(
  '[Meals Persistence] Rehydrate Meals State Failure',
);

export const hydrateMealsState = createAction(
  '[Meals Persistence] Hydrate Meals State',
  props<{
    mealsState: MealsState;
    sourceAction: TypedAction<string>;
  }>(),
);

export const hydrateMealsStateSuccess = createAction(
  '[Meals Persistence] Hydrate Meals State Success',
  props<{ sourceAction: TypedAction<string> }>(),
);

export const hydrateMealsStateFailure = createAction(
  '[Meals Persistence] Hydrate Meals State Failure',
  props<{ sourceAction: TypedAction<string> }>(),
);
