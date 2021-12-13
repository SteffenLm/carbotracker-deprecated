import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MealsLocalStorageService } from '../../../services/meals-local-storage.service';
import { LocalStorageApiActions } from '../actions/api';
import { MealsState } from '../meals.reducer';
import { selectMealsState } from '../meals.selectors';

@Injectable()
export class MealsLocalStorageEffects {
  saveToLocalStorage$ = createEffect(() => {
    return this.actions$.pipe(
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
