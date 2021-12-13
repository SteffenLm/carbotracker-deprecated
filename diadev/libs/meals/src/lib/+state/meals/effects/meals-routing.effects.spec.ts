import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MealsRoutingEffects } from './meals-routing.effects';

describe('MealsRoutingEffects', () => {
  let actions$: Observable<any>;
  let effects: MealsRoutingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MealsRoutingEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MealsRoutingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
