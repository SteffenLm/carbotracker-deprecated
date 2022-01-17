import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { MealsRoutingService } from '../../../services/meals-routing.service';
import {
  CreateMealEntryPageActions,
  CurrentMealPageActions,
  EditMealEntryPageActions,
} from '../actions/ui';

import { MealsRoutingEffects } from './meals-routing.effects';

describe('MealsRoutingEffects', () => {
  let actions$: Observable<Action>;
  let effects: MealsRoutingEffects;
  let mealsRoutingServiceMock: Partial<MealsRoutingService>;

  beforeEach(() => {
    mealsRoutingServiceMock = {
      navigateToCreatePage: jest.fn(),
      navigateToCurrentMeal: jest.fn(),
      navigateToMealEntryDetails: jest.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        MealsRoutingEffects,
        provideMockActions(() => actions$),
        {
          provide: MealsRoutingService,
          useValue: mealsRoutingServiceMock,
        },
      ],
    });

    effects = TestBed.inject(MealsRoutingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('navigateToCreatePage$', () => {
    describe('when the add a new meal entry button is clicked', () => {
      it('should navigate to the create page', () => {
        actions$ = of(CurrentMealPageActions.createMealEntry);

        effects.navigateToCreatePage$.subscribe();

        expect(mealsRoutingServiceMock.navigateToCreatePage).toHaveBeenCalled();
      });
    });
  });

  describe('navigateToCurrentMealPage$', () => {
    describe('when the user navigates to the current meal page', () => {
      it('should happen from the create meal entry page after save', () => {
        actions$ = of(CreateMealEntryPageActions.createMealEntry);
      });

      it('should happen from the create meal entry page after navigate back', () => {
        actions$ = of(CreateMealEntryPageActions.navigateBack);
      });

      it('should happen from the create meal entry page after abort', () => {
        actions$ = of(CreateMealEntryPageActions.abortMealEntryCreation);
      });

      it('should happen from the edit meal entry page after update', () => {
        actions$ = of(EditMealEntryPageActions.updateMealEntry);
      });

      it('should happen from the edit meal entry page after navigate back', () => {
        actions$ = of(EditMealEntryPageActions.navigateBack);
      });

      it('should happen from the edit meal entry page after delete', () => {
        actions$ = of(EditMealEntryPageActions.deleteMealEntry);
      });

      afterEach(() => {
        effects.navigateToCurrentMealPage$.subscribe();
        expect(
          mealsRoutingServiceMock.navigateToCurrentMeal,
        ).toHaveBeenCalled();
      });
    });
  });

  describe('navigateToMealEntryDetails$', () => {
    describe('when the meal entry is clicked', () => {
      it('should navigate to the meal entry details', () => {
        actions$ = of(CurrentMealPageActions.selectMealEntry);

        effects.navigateToMealEntryDetails$.subscribe();

        expect(
          mealsRoutingServiceMock.navigateToMealEntryDetails,
        ).toHaveBeenCalled();
      });
    });
  });
});
