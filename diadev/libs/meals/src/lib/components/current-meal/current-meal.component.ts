import { Component } from '@angular/core';
import { MealsFacade } from '@diadev/meals';

@Component({
  selector: 'diadev-current-meal',
  templateUrl: './current-meal.component.html',
  styleUrls: ['./current-meal.component.scss'],
})
export class CurrentMealComponent {
  public allMealEntries = this.mealsFacade.allMeals;

  constructor(private readonly mealsFacade: MealsFacade) {}

  public onDeleteCurrentMeal(): void {
    this.mealsFacade.deleteCurrentMeal();
  }
}
