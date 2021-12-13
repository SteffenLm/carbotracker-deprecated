import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromMeals from './meals/meals.reducer';
import { MealsEffects } from './meals/meals.effects';
import { MealsFacade } from './meals/meals.facade';
import { MealsPersistenceEffects } from './meals/meals-persistence/meals-persistence.effects';
import { MealsRoutingEffects } from './meals/effects/meals-routing.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(fromMeals.MEALS_FEATURE_KEY, fromMeals.mealsReducer),
    EffectsModule.forFeature([
      MealsEffects,
      MealsPersistenceEffects,
      MealsRoutingEffects,
    ]),
  ],
  providers: [MealsFacade],
})
export class MealsStateModule {}
