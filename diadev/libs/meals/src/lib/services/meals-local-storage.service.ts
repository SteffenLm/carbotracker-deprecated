import { Injectable } from '@angular/core';
import { LocalStorageManager } from '@diadev/localstorage';
import { MealsState, MEALS_FEATURE_KEY } from '../+state/meals/meals.reducer';

@Injectable({
  providedIn: 'root',
})
export class MealsLocalStorageService extends LocalStorageManager<MealsState> {
  constructor() {
    super(MEALS_FEATURE_KEY);
  }
}
