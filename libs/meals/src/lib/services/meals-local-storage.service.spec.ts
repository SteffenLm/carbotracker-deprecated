import { TestBed } from '@angular/core/testing';

import { MealsLocalStorageService } from './meals-local-storage.service';

describe('MealsLocalStorageService', () => {
  let service: MealsLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealsLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
