import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromMeals from './+state/meals/meals.reducer';
import { MealsEffects } from './+state/meals/meals.effects';
import { MealsFacade } from './+state/meals/meals.facade';

@NgModule({
  imports: [
    StoreModule.forFeature(fromMeals.MEALS_FEATURE_KEY, fromMeals.reducer),
    EffectsModule.forFeature([MealsEffects]),
  ],
  providers: [MealsFacade],
})
export class MealsStateModule {}
