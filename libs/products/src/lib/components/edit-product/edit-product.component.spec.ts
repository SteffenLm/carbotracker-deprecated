import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ProductEditPageActions } from '../../+state/products/actions/ui';
import { ProductForm } from '../../forms/product-form';
import { getPastaProductFormValue } from '../../model/product-form-value.model';
import { getPastaProductsEntity } from '../../model/products-entity.model';
import { EditProductComponent } from './edit-product.component';

describe('EditProductComponent', () => {
  const prepareTest = () => {
    const mockedStore: Partial<Store> = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of()),
    };
    const mockedProductForm: Partial<ProductForm> = {
      getValue: jest.fn(),
      isValid: jest.fn().mockReturnValue(of(true)),
    };
    const component = new EditProductComponent(
      mockedStore as Store,
      mockedProductForm as ProductForm,
    );
    return {
      store: mockedStore,
      productForm: mockedProductForm,
      component,
    };
  };
  describe('if I press the submit button', () => {
    it('should dispatch a update product action', () => {
      const { component, productForm, store } = prepareTest();
      jest
        .spyOn(productForm, 'getValue')
        .mockReturnValue(getPastaProductFormValue());
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      const givenProductId = getPastaProductsEntity().id;

      component.onSubmit(givenProductId);

      const expectedAction = ProductEditPageActions.updateProduct({
        updatedProduct: getPastaProductsEntity(),
      });
      expect(dispatchSpy).toHaveBeenLastCalledWith(expectedAction);
    });
  });
  describe('if I press the delete button', () => {
    it('should dispatch a delete product action', () => {
      const { component, store } = prepareTest();
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      const givenProductId = 'MOCKED_ID';

      component.onDeleteProduct(givenProductId);

      const expectedAction = ProductEditPageActions.deleteProduct({
        productId: givenProductId,
      });
      expect(dispatchSpy).toHaveBeenLastCalledWith(expectedAction);
    });
  });
  describe('if I press the navigate back button', () => {
    it('should dispatch a navigate back action', () => {
      const { component, store } = prepareTest();
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      component.onClickBackNavigation();

      const expectedAction = ProductEditPageActions.navigateBack();
      expect(dispatchSpy).toHaveBeenLastCalledWith(expectedAction);
    });
  });
  describe('if I press the go back button', () => {
    it('should dispatch a go back to products action', () => {
      const { component, store } = prepareTest();
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      component.onGoBack();

      const expectedAction = ProductEditPageActions.goBackToProducts();
      expect(dispatchSpy).toHaveBeenLastCalledWith(expectedAction);
    });
  });
});
