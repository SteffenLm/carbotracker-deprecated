import { FormBuilder, FormGroup } from '@angular/forms';
import {
  getEmptyFormValue,
  getPastaFormValue,
  ProductFormValue,
} from '../model/product-form-value.model';
import { ProductFormModel } from './product-form-model';

import { take } from 'rxjs/operators';

describe('ProductFormModel', () => {
  let mockedFormBuilder: FormBuilder;

  beforeEach(() => {
    mockedFormBuilder = {
      group: jest.fn(),
    } as unknown as FormBuilder;
  });

  it('should create an instance', () => {
    expect(new ProductFormModel(new FormBuilder())).toBeTruthy();
  });

  it('should return the given created form group', () => {
    jest
      .spyOn(mockedFormBuilder, 'group')
      .mockReturnValue('Test' as unknown as FormGroup);

    const productFormModel = new ProductFormModel(
      mockedFormBuilder as FormBuilder,
    );

    expect(productFormModel.getFormGroup()).toEqual('Test');
  });

  it('should return the value of the form group', () => {
    const productFormModel = new ProductFormModel(new FormBuilder());

    const expectedFormValue: ProductFormValue = {
      name: '',
      carbohydratesPer100Gram: '',
    };

    expect(productFormModel.getValue()).toEqual(expectedFormValue);
  });

  it('should return setted values as stream', () => {
    const productFormModel = new ProductFormModel(new FormBuilder());
    const givenValues: ProductFormValue[] = [
      getEmptyFormValue(),
      getPastaFormValue(),
    ];
    const resultItems: ProductFormValue[] = [];
    productFormModel
      .getValueChanges()
      .pipe(take(2))
      .subscribe((formValue) => resultItems.push(formValue));
    givenValues.forEach((value) =>
      productFormModel.getFormGroup().setValue(value),
    );

    const expectedResult: ProductFormValue[] = [
      getEmptyFormValue(),
      getPastaFormValue(),
    ];
    expect(resultItems).toEqual(expectedResult);
  });
});
