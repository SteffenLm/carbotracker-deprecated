import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { MealsLocalStorageService } from '../../../services/meals-local-storage.service';
import { LocalStorageApiActions, SystemApiActions } from '../actions/api';

import { MealsLocalStorageEffects } from './meals-local-storage.effects';
import { MealsState } from '../model/meals-state.model';
import { CreateMealEntryPageActions } from '../actions/ui';
import { getPastaMealEntry } from '../../../model/meal-entry.models';
import { take } from 'rxjs/operators';
import { selectMealsState } from '../selectors/meals-state.selectors';

describe('MealsLocalStorageEffects', () => {
  let actions$: Observable<Action>;
  let effects: MealsLocalStorageEffects;
  let loadMock: jest.Mock;
  let saveMock: jest.Mock;

  const getMarbleValues = () => ({
    a: SystemApiActions.initialize(),
    b: LocalStorageApiActions.loadProductStateFromLocalStorageSuccess({
      mealsState: 'SUCCESS' as unknown as MealsState,
    }),
    c: LocalStorageApiActions.loadProductStateFromLocalStorageFailure(),
    d: LocalStorageApiActions.saveProductStateToLocalStorageSuccess(),
    e: LocalStorageApiActions.loadProductStateFromLocalStorageFailure(),
    f: CreateMealEntryPageActions.createMealEntry({
      mealEntry: getPastaMealEntry(),
    }),
    g: LocalStorageApiActions.saveProductStateToLocalStorageFailure(),
  });

  beforeEach(() => {
    loadMock = jest.fn();
    saveMock = jest.fn();
    const mealsLocalStorageServiceMock: Partial<MealsLocalStorageService> = {
      load: loadMock,
      save: saveMock,
    };
    TestBed.configureTestingModule({
      providers: [
        MealsLocalStorageEffects,
        provideMockActions(() => actions$),
        {
          provide: MealsLocalStorageService,
          useValue: mealsLocalStorageServiceMock,
        },
        provideMockStore({
          selectors: [
            {
              selector: selectMealsState,
              value: 'MOCKED_STATE_VALUE',
            },
          ],
          initialState: {},
        }),
      ],
    });

    effects = TestBed.inject(MealsLocalStorageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadFromLocalStorage$', () => {
    describe('if the system get initialized', () => {
      it(
        'should dispatch a load from local storage success event',
        (done) => {
          loadMock.mockReturnValue('SUCCESS');
          actions$ = of(getMarbleValues().a);

          effects.loadFromLocalStorage$.subscribe(
            (action) => { 
              expect(action).toEqual(getMarbleValues().b);
              done();
            }
          );
        });
      it(
        'should dispatch a load from local storage error event if local storage api fails',
        (done) => {
          loadMock.mockImplementation(() => {
            throw new Error();
          });
          actions$ = of(getMarbleValues().a);

          effects.loadFromLocalStorage$.subscribe(
            (action) => { 
              expect(action).toEqual(getMarbleValues().c);
              done();
            }
          );
        });
    });
  });
  describe('saveToLocalStorage$', () => {
    describe('if a create meal entry gets dispatched', () => {
      beforeEach(() => {
          actions$ = of(getMarbleValues().f);
      });
      it(
        'should dispatch a save to local storage success event',
        (done) => {
            effects.saveToLocalStorage$.subscribe(
              (action) => {
                expect(action).toEqual(getMarbleValues().d)
                done();
              }
            );
        });
      it(
        'should dispatch a save to local storage error event if local storage api fails',
        (done) => {
          saveMock.mockImplementation(() => {
            throw new Error();
          });

          effects.saveToLocalStorage$.subscribe(
            (action) => {
              expect(action).toEqual(getMarbleValues().g)
              done();
            }
          );
        });
    });
  });
});
