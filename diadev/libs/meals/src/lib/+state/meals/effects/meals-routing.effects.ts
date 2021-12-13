import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { MealsRoutingService } from '../../../services/meals-routing.service';
import { CurrentMealPageActions } from '../actions/ui';

@Injectable()
export class MealsRoutingEffects {
  navigateToCreatePage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CurrentMealPageActions.createMealEntry),
        tap(() => this.mealsRoutingService.navigateToCreatePage()),
      );
    },
    {
      dispatch: false,
    },
  );

  constructor(
    private actions$: Actions,
    private readonly mealsRoutingService: MealsRoutingService,
  ) {}
}
