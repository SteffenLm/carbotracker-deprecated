import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as MealsActions from './meals.actions';
import { MealsEffects } from './meals.effects';

describe('MealsEffects', () => {
  let actions: Observable<Action>;
  let effects: MealsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        MealsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(MealsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: MealsActions.init() });

      const expected = hot('-a-|', {
        a: MealsActions.loadMealsSuccess({ meals: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
