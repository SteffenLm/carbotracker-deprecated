import { TestBed } from '@angular/core/testing';

import { MealsRoutingService } from './meals-routing.service';

describe('MealsRoutingService', () => {
  let service: MealsRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealsRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
