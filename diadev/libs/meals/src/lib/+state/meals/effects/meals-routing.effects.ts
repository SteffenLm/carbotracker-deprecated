import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { MealsRoutingService } from '../../../services/meals-routing.service';
import {
  CreateMealEntryPageActions,
  CurrentMealPageActions,
  EditMealEntryPageActions,
} from '../actions/ui';

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

  navigateToCurrentMealPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CreateMealEntryPageActions.createMealEntry,
          CreateMealEntryPageActions.abortMealEntryCreation,
          CreateMealEntryPageActions.navigateBack,
          EditMealEntryPageActions.updateMealEntry,
          EditMealEntryPageActions.deleteMealEntry,
          EditMealEntryPageActions.navigateBack,
        ),
        tap(() => this.mealsRoutingService.navigateToCurrentMeal()),
      );
    },
    {
      dispatch: false,
    },
  );

  navigateToMealEntryDetails$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CurrentMealPageActions.selectMealEntry),
        tap(({ mealEntryId }) =>
          this.mealsRoutingService.navigateToMealEntryDetails(mealEntryId),
        ),
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
