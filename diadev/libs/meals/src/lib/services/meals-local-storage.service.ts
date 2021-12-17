import { Injectable } from '@angular/core';
import { LocalStorageManager } from '@diadev/localstorage';
import { MEALS_FEATURE_KEY } from '../+state/meals/meals.reducer';
import { MealsState } from '../+state/meals/model/meals-state.model';

@Injectable({
  providedIn: 'root',
})
export class MealsLocalStorageService extends LocalStorageManager<MealsState> {
  constructor() {
    super(MEALS_FEATURE_KEY);
  }
}
