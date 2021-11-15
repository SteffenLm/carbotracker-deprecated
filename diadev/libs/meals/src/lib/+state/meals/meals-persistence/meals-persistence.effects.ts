import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import {
  createLocalStorageLoader,
  createLocalStorageSaver,
} from '@diadev/localstorage';

import * as MealsPersistenceActions from './meals-persistence.actions';
import * as MealsFeature from '../meals.reducer';

@Injectable()
export class MealsPersistenceEffects {
  loadMealsState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MealsPersistenceActions.rehydrateMealsState),
      map(() => {
        try {
          const mealsState = this.loadMealsState();
          return MealsPersistenceActions.rehydrateMealsStateSuccess({
            mealsState,
          });
        } catch (error) {
          return MealsPersistenceActions.rehydrateMealsStateFailure();
        }
      }),
    );
  });

  saveMealsState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MealsPersistenceActions.hydrateMealsState),
      map(({ mealsState, sourceAction }) => {
        try {
          this.saveMealsState(mealsState);
          return MealsPersistenceActions.hydrateMealsStateSuccess({
            sourceAction,
          });
        } catch (error) {
          return MealsPersistenceActions.hydrateMealsStateFailure({
            sourceAction,
          });
        }
      }),
    );
  });

  constructor(private readonly actions$: Actions) {}

  private saveMealsState = createLocalStorageSaver<MealsFeature.MealsState>(
    MealsFeature.MEALS_FEATURE_KEY,
  );
  private loadMealsState = createLocalStorageLoader<MealsFeature.MealsState>(
    MealsFeature.MEALS_FEATURE_KEY,
  );
}
