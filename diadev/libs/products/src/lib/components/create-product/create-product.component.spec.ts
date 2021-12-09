import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ProductCreatePageActions } from '../../+state/products/actions/ui';
import { ProductForm } from '../../forms/product-form';
import { getPastaProductFormValue } from '../../model/product-form-value.model';
import { getPastaProductsEntity } from '../../model/products-entity.model';
import { CreateProductComponent } from './create-product.component';
describe('CreateProductComponent', () => {
  const prepareTest = () => {
    const mockedStore: Partial<Store> = {
      dispatch: jest.fn(),
    };
    const mockedProductForm: Partial<ProductForm> = {
      getValue: jest.fn(),
      isValid: jest.fn().mockReturnValue(of(true)),
    };
    const component = new CreateProductComponent(
      mockedStore as Store,
      mockedProductForm as ProductForm,
    );
    return {
      store: mockedStore,
      productForm: mockedProductForm,
      component,
    };
  };
  describe('if i click the navigate back button', () => {
    it('should dispatch an navigate back action', () => {
      const { component, store } = prepareTest();
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.onClickBackNavigation();
      expect(dispatchSpy).toHaveBeenCalledWith(
        ProductCreatePageActions.navigateBack(),
      );
    });
  });
  describe('if i click the close button', () => {
    it('should dispatch an abort product creation action', () => {
      const { component, store } = prepareTest();
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.onClose();
      expect(dispatchSpy).toHaveBeenCalledWith(
        ProductCreatePageActions.abortProductCreation(),
      );
    });
  });
  describe('if i click the save button', () => {
    it('should dispatch a save product action', () => {
      const { component, store, productForm } = prepareTest();
      jest.useFakeTimers();
      const givenFormValue = getPastaProductFormValue();
      jest.spyOn(productForm, 'getValue').mockReturnValue(givenFormValue);
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      component.onSave();

      const expectedAction = ProductCreatePageActions.saveProduct({
        product: {
          ...getPastaProductsEntity(),
          id: Date.now().toString(),
        },
      });
      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
  });
});
