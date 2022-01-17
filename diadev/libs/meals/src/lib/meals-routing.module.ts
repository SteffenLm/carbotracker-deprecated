import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMealEntryComponent } from './components/create-meal-entry/create-meal-entry.component';
import { CurrentMealComponent } from './components/current-meal/current-meal.component';
import { EditMealEntryComponent } from './components/edit-meal-entry/edit-meal-entry.component';

const mealsRoutes: Routes = [
  {
    path: '',
    component: CurrentMealComponent,
  },
  {
    path: 'create',
    component: CreateMealEntryComponent,
  },
  {
    path: ':id',
    component: EditMealEntryComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(mealsRoutes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
