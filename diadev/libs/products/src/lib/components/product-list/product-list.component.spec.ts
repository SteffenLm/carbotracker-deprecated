import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ProductListPageActions } from '../../+state/products/actions/ui';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  const prepareTest = () => {
    const mockedStore: Partial<Store> = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of()),
    };
    const component = new ProductListComponent(mockedStore as Store);
    return {
      store: mockedStore,
      component,
    };
  };
  describe('if I select a product from the list', () => {
    it('should dispatch a select product action', () => {
      const { component, store } = prepareTest();
      const givenProductId = 'MOCKED_PRODUCT_ID';
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      component.onSelectProduct(givenProductId);

      const expectedAction = ProductListPageActions.selectProduct({
        productId: givenProductId,
      });
      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
  });
  describe('if I click the create button', () => {
    it('should dispatch a create product action', () => {
      const { component, store } = prepareTest();
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      component.onCreate();

      const expectedAction = ProductListPageActions.createProduct();
      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
  });
});
