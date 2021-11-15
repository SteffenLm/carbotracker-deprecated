import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as MealsActions from './meals.actions';
import * as MealsSelectors from './meals.selectors';

@Injectable()
export class MealsFacade {
  areMealsLoaded = this.store.select(MealsSelectors.selectMealsLoaded);
  allMeals = this.store.select(MealsSelectors.selectAllMeals);
  selectedMeal = this.store.select(MealsSelectors.selectSelected);
  mealsState = this.store.select(MealsSelectors.selectMealsState);

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(MealsActions.init());
  }

  public deleteCurrentMeal(): void {
    this.store.dispatch(MealsActions.deleteCurrentMeal());
  }
}
