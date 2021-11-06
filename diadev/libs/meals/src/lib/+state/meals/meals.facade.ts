import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as MealsActions from './meals.actions';
import * as MealsFeature from './meals.reducer';
import * as MealsSelectors from './meals.selectors';

@Injectable()
export class MealsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(MealsSelectors.getMealsLoaded));
  allMeals$ = this.store.pipe(select(MealsSelectors.getAllMeals));
  selectedMeals$ = this.store.pipe(select(MealsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(MealsActions.init());
  }
}
