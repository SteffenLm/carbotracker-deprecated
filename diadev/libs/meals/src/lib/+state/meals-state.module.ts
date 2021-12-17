import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromMeals from './meals/meals.reducer';
import { MealsRoutingEffects } from './meals/effects/meals-routing.effects';
import { SystemApiActions } from './meals/actions/api';
import { MealsLocalStorageEffects } from './meals/effects/meals-local-storage.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(fromMeals.MEALS_FEATURE_KEY, fromMeals.mealsReducer),
    EffectsModule.forFeature([MealsRoutingEffects, MealsLocalStorageEffects]),
  ],
})
export class MealsStateModule {
  constructor(store: Store) {
    store.dispatch(SystemApiActions.initialize());
  }
}
