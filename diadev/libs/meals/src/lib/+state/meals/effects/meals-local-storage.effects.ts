import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MealsLocalStorageService } from '../../../services/meals-local-storage.service';
import { LocalStorageApiActions, SystemApiActions } from '../actions/api';
import {
  CreateMealEntryPageActions,
  EditMealEntryPageActions,
} from '../actions/ui';
import { MealsState } from '../model/meals-state.model';
import { selectMealsState } from '../selectors/meals.selectors';

@Injectable()
export class MealsLocalStorageEffects {
  saveToLocalStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CreateMealEntryPageActions.createMealEntry,
        EditMealEntryPageActions.deleteMealEntry,
        EditMealEntryPageActions.updateMealEntry,
      ),
      concatLatestFrom(() => this.selectMealsState()),
      map(([, mealsState]) => {
        try {
          this.mealsLocalStorageService.save(mealsState);
          return LocalStorageApiActions.saveProductStateToLocalStorageSuccess();
        } catch {
          return LocalStorageApiActions.saveProductStateToLocalStorageFailure();
        }
      }),
    );
  });

  loadFromLocalStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SystemApiActions.initialize),
      map(() => {
        try {
          const cachedState = this.mealsLocalStorageService.load();
          return LocalStorageApiActions.loadProductStateFromLocalStorageSuccess(
            {
              mealsState: cachedState,
            },
          );
        } catch {
          return LocalStorageApiActions.loadProductStateFromLocalStorageFailure();
        }
      }),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly mealsLocalStorageService: MealsLocalStorageService,
  ) {}

  private selectMealsState(): Observable<MealsState> {
    return this.store.select(selectMealsState);
  }
}
