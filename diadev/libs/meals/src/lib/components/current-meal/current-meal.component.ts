import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentMealPageActions } from '../../+state/meals/actions/ui';
import { selectAllMeals } from '../../+state/meals/selectors/meals.selectors';
import { MealEntry } from '../../model/meal-entry.models';

@Component({
  selector: 'diadev-current-meal',
  templateUrl: './current-meal.component.html',
  styleUrls: ['./current-meal.component.scss'],
})
export class CurrentMealComponent {
  public currentMealEntries$: Observable<MealEntry[]> =
    this.store.select(selectAllMeals);

  constructor(private readonly store: Store) {}

  public onCreate(): void {
    this.store.dispatch(CurrentMealPageActions.createMealEntry());
  }

  public onSelectMealEntry(mealEntryId: string): void {
    this.store.dispatch(
      CurrentMealPageActions.selectMealEntry({ mealEntryId }),
    );
  }

  public onDelete(): void {
    this.store.dispatch(CurrentMealPageActions.deletCurrentMeal());
  }
}
