import { TestBed } from '@angular/core/testing';

import { ProductsLocalStorageService } from './products-local-storage.service';

describe('ProductsLocalStorageService', () => {
  let service: ProductsLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
