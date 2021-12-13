import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MealsLocalStorageEffects } from './meals-local-storage.effects';

describe('MealsLocalStorageEffects', () => {
  let actions$: Observable<any>;
  let effects: MealsLocalStorageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MealsLocalStorageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MealsLocalStorageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
