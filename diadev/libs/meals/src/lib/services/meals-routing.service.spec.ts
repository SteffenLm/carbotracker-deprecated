import { Router } from '@angular/router';

import { MealsRoutingService } from './meals-routing.service';

describe('MealsRoutingService', () => {
  const prepareTest = () => {
    const urlBasePathMock = 'meals';
    const routerMock: Partial<Router> = {
      navigate: jest.fn(),
    };
    const mealsRoutingService = new MealsRoutingService(
      urlBasePathMock,
      routerMock as Router,
    );
    return {
      mealsRoutingService,
      routerMock,
      urlBasePathMock,
    };
  };

  it('should be created', () => {
    const { mealsRoutingService } = prepareTest();
    expect(mealsRoutingService).toBeTruthy();
  });

  describe('navigateToCreatePage', () => {
    it('should navigate to create', () => {
      const { mealsRoutingService, routerMock, urlBasePathMock } =
        prepareTest();
      mealsRoutingService.navigateToCreatePage();
      expect(routerMock.navigate).toHaveBeenCalledWith([
        urlBasePathMock,
        'create',
      ]);
    });
  });

  describe('navigateToCurrentMeal', () => {
    it('should navigate to start', () => {
      const { mealsRoutingService, routerMock, urlBasePathMock } =
        prepareTest();
      mealsRoutingService.navigateToCurrentMeal();
      expect(routerMock.navigate).toHaveBeenCalledWith([urlBasePathMock]);
    });
  });

  describe('navigateToCreatePage', () => {
    it('should navigate to details', () => {
      const { mealsRoutingService, routerMock, urlBasePathMock } =
        prepareTest();
      mealsRoutingService.navigateToMealEntryDetails('MEAL_ENTRY_MOCK');
      expect(routerMock.navigate).toHaveBeenCalledWith([
        urlBasePathMock,
        'MEAL_ENTRY_MOCK',
      ]);
    });
  });
});
