import { FormBuilder, FormGroup } from '@angular/forms';
import {
  getEmptyFormValue,
  getPastaProductFormValue,
  ProductFormValue,
} from '../model/product-form-value.model';
import { ProductFormModel } from './product-form-model';

import { take, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
      getPastaProductFormValue(),
    ];
    let resultItems: ProductFormValue[] = [];
    productFormModel
      .getValueChanges()
      .pipe(take(2), toArray())
      .subscribe((products) => (resultItems = products));
    givenValues.forEach((value) =>
      productFormModel.getFormGroup().setValue(value),
    );

    const expectedResult: ProductFormValue[] = [
      getEmptyFormValue(),
      getPastaProductFormValue(),
    ];
    expect(resultItems).toEqual(expectedResult);
  });

  it('should return the statusChanges property of the formgroup', () => {
    const mockedValueChanges = {};
    jest.spyOn(mockedFormBuilder, 'group').mockReturnValue({
      statusChanges: mockedValueChanges as Observable<unknown>,
    } as FormGroup);
    const productFormModel = new ProductFormModel(mockedFormBuilder);
    expect(productFormModel.getStatusChanges()).toBe(mockedValueChanges);
  });

  it('should return the valid property of the formgroup', () => {
    const mockedValueProperty = {};
    jest.spyOn(mockedFormBuilder, 'group').mockReturnValue({
      valid: mockedValueProperty as boolean,
    } as FormGroup);
    const productFormModel = new ProductFormModel(mockedFormBuilder);
    expect(productFormModel.getValid()).toBe(mockedValueProperty);
  });
});
