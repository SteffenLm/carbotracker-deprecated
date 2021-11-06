import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as MealsActions from './meals.actions';
import * as MealsFeature from './meals.reducer';

@Injectable()
export class MealsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MealsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return MealsActions.loadMealsSuccess({ meals: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return MealsActions.loadMealsFailure({ error });
        },
      }),
    ),
  );

  constructor(private readonly actions$: Actions) {}
}
