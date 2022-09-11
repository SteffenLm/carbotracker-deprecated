import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsStateModule } from './+state/meals-state.module';
import { CurrentMealComponent } from './components/current-meal/current-meal.component';
import { UiModule } from '@diadev/ui';
import { RouterModule } from '@angular/router';

import { MealsRoutingModule } from './meals-routing.module';
import { CreateMealEntryComponent } from './components/create-meal-entry/create-meal-entry.component';
import { EditMealEntryComponent } from './components/edit-meal-entry/edit-meal-entry.component';
import { MealsMaterialModule } from './meals-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MealsRoutingService } from './services/meals-routing.service';

@NgModule({
  imports: [
    CommonModule,
    MealsStateModule,
    MealsRoutingModule,
    MealsMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    UiModule,
  ],
  declarations: [
    CurrentMealComponent,
    CreateMealEntryComponent,
    EditMealEntryComponent,
  ],
  providers: [MealsRoutingService],
})
export class MealsModule {}
