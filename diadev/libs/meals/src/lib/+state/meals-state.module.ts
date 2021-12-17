import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromMeals from './meals/meals.reducer';
import { MealsEffects } from './meals/meals.effects';
import { MealsFacade } from './meals/meals.facade';
import { MealsPersistenceEffects } from './meals/meals-persistence/meals-persistence.effects';
import { MealsRoutingEffects } from './meals/effects/meals-routing.effects';
import { SystemApiActions } from './meals/actions/api';
import { MealsLocalStorageEffects } from './meals/effects/meals-local-storage.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(fromMeals.MEALS_FEATURE_KEY, fromMeals.mealsReducer),
    EffectsModule.forFeature([
      MealsEffects,
      MealsPersistenceEffects,
      MealsRoutingEffects,
      MealsLocalStorageEffects,
    ]),
  ],
  providers: [MealsFacade],
})
export class MealsStateModule {
  constructor(store: Store) {
    store.dispatch(SystemApiActions.initialize());
  }
}
