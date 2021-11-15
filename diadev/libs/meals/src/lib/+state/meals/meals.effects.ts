import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as MealsActions from './meals.actions';
import * as MealsPersistenceActions from '../meals/meals-persistence/meals-persistence.actions';
import { MealsFacade } from './meals.facade';

@Injectable()
export class MealsEffects {
  init = createEffect(() => {
    return this.actions$.pipe(
      ofType(MealsActions.init),
      switchMap(() => {
        return of(MealsPersistenceActions.rehydrateMealsState());
      }),
    );
  });

  editMealsState = createEffect(() => {
    return this.actions$.pipe(
      ofType(MealsActions.createMeal),
      concatLatestFrom(() => this.mealsFacade.mealsState),
      map(([sourceAction, mealsState]) =>
        MealsPersistenceActions.hydrateMealsState({
          mealsState,
          sourceAction,
        }),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly mealsFacade: MealsFacade,
  ) {}
}
