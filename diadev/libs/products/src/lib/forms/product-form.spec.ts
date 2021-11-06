import { FormBuilder } from '@angular/forms';
import { EMPTY, range } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { ProductForm } from './product-form';
import { ProductFormModel } from './product-form-model';

describe('ProductForm', () => {
  let mockedProductFormModel: ProductFormModel;
  describe('getAsFormGroup()', () => {
    describe('if i create and initialize a product from', () => {
      const mockedFormGroup = new FormBuilder().group({});
      const mockedFormBuilder: Partial<FormBuilder> = {
        group: jest.fn().mockReturnValue(mockedFormGroup),
      };
      const givenProductForm = new ProductForm(
        new ProductFormModel(mockedFormBuilder as FormBuilder),
      );

      it('should return the initial form group', () => {
        const result = givenProductForm.getAsFormGroup();
        expect(result).toBe(mockedFormGroup);
      });
    });
  });
  describe('isValid()', () => {
    const getStatusChangesSpy = jest.fn();
    const getValidSpy = jest.fn();
    beforeEach(() => {
      mockedProductFormModel = {
        getFormGroup: jest.fn(),
        getStatusChanges: getStatusChangesSpy,
        getValid: getValidSpy,
      } as unknown as ProductFormModel;
    });

    describe('if i initialize a product from', () => {
      describe('if i enter no values to the form', () => {
        it('should return false without any emitted value', () => {
          getStatusChangesSpy.mockReturnValue(EMPTY);
          const givenProductForm = new ProductForm(mockedProductFormModel);
          let resultValues: boolean[] = [];
          givenProductForm
            .isValid()
            .pipe(toArray())
            .subscribe((result) => (resultValues = result));
          expect(resultValues).toEqual([false]);
        });
      });

      describe('if i enter values to the form', () => {
        it('should return the values of get valid for each emitted value', () => {
          getStatusChangesSpy.mockReturnValue(range(0, 2));
          getValidSpy.mockReturnValueOnce(true).mockReturnValueOnce(false);
          const givenProductForm = new ProductForm(mockedProductFormModel);
          let resultValues: boolean[] = [];
          givenProductForm
            .isValid()
            .pipe(toArray())
            .subscribe((result) => (resultValues = result));
          expect(resultValues).toEqual([false, true, false]);
        });
      });
    });
  });
});
