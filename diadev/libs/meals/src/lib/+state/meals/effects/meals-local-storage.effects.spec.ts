import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { MealsLocalStorageService } from '../../../services/meals-local-storage.service';
import { LocalStorageApiActions, SystemApiActions } from '../actions/api';
import { marbles } from 'rxjs-marbles/jest';

import { MealsLocalStorageEffects } from './meals-local-storage.effects';
import { MealsState } from '../model/meals-state.model';
import { CreateMealEntryPageActions } from '../actions/ui';
import { getPastaMealEntry } from '../../../model/meal-entry.models';
import { selectMealsState } from '../selectors/meals.selectors';
import { take } from 'rxjs/operators';

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
        marbles((m) => {
          loadMock.mockReturnValue('SUCCESS');
          actions$ = m.cold('-a', getMarbleValues());
          const expectedActions$ = m.cold('-b', getMarbleValues());
          m.expect(effects.loadFromLocalStorage$).toBeObservable(
            expectedActions$ as unknown as never,
          );
        }),
      );
      it(
        'should dispatch a load from local storage error event if local storage api fails',
        marbles((m) => {
          loadMock.mockImplementation(() => {
            throw new Error();
          });
          actions$ = m.cold('-a', getMarbleValues());
          const expectedActions$ = m.cold('-c', getMarbleValues());
          m.expect(effects.loadFromLocalStorage$).toBeObservable(
            expectedActions$ as unknown as never,
          );
        }),
      );
    });
  });
  describe('saveToLocalStorage$', () => {
    describe('if a create meal entry gets dispatched', () => {
      beforeEach((done) => {
        marbles((m) => {
          actions$ = m.cold('-f', getMarbleValues());
          done();
        })();
      });
      it(
        'should dispatch a save to local storage success event',
        marbles((m) => {
          const expectedActions$ = m.cold('-d', getMarbleValues());
          m.expect(effects.saveToLocalStorage$).toBeObservable(
            expectedActions$ as unknown as never,
          );
        }),
      );
      it('should call the save method of the local storage service', (done) => {
        marbles((m) => {
          m.flush();
          effects.saveToLocalStorage$.pipe(take(1)).subscribe(() => {
            expect(saveMock).toHaveBeenCalledWith('MOCKED_STATE_VALUE');
            done();
          });
        })();
      });
    });
  });
});
