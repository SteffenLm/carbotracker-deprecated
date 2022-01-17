import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ProductsRoutingService } from './products-routing.service';
import { PRODUCTS_ROUTING_PATH } from '../model/products-routing.model';

describe('ProductsRoutingService', () => {
  let service: ProductsRoutingService;
  let mockedRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PRODUCTS_ROUTING_PATH,
          useValue: 'products',
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
        ProductsRoutingService,
      ],
    });
    service = TestBed.inject(ProductsRoutingService);
    mockedRouter = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('if I navigate to the products page', () => {
    it('should call the base path', () => {
      const navigateSpy = jest.spyOn(mockedRouter, 'navigate');

      service.navigateToProductsPage();

      expect(navigateSpy).toHaveBeenLastCalledWith(['products']);
    });
  });
  describe('if I navigate to the create page', () => {
    it('should call the base path and create', () => {
      const navigateSpy = jest.spyOn(mockedRouter, 'navigate');

      service.navigateToCreatePage();

      expect(navigateSpy).toHaveBeenLastCalledWith(['products', 'create']);
    });
  });
  describe('if I navigate to the edit page', () => {
    it('should call the base path with the id', () => {
      const navigateSpy = jest.spyOn(mockedRouter, 'navigate');
      const givenId = 'MOCKED_ID';
      service.navigateToEditPage(givenId);

      expect(navigateSpy).toHaveBeenLastCalledWith(['products', givenId]);
    });
  });
});
