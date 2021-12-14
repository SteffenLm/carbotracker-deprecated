import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MEALS_ROUTING_PATH } from '../model/meals-routing.model';

@Injectable()
export class MealsRoutingService {
  constructor(
    @Inject(MEALS_ROUTING_PATH) private readonly urlBasePath: string,
    private readonly router: Router,
  ) {}

  public navigateToCreatePage(): void {
    this.router.navigate([this.urlBasePath, 'create']);
  }

  public navigateToCurrentMeal(): void {
    this.router.navigate([this.urlBasePath]);
  }

  public navigateToMealEntryDetails(mealEntryId: string): void {
    this.router.navigate([this.urlBasePath, mealEntryId]);
  }
}
