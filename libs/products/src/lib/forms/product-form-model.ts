import {
  UntypedFormBuilder,
  UntypedFormControl,
  FormControlStatus,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductFormValue } from '../model/product-form-value.model';

export class ProductFormModel {
  private readonly productFormGroup: UntypedFormGroup =
    this.createProductFormGroup();

  constructor(private readonly formBuilder: UntypedFormBuilder) {}

  public getFormGroup(): UntypedFormGroup {
    return this.productFormGroup;
  }

  public getValueChanges(): Observable<ProductFormValue> {
    return this.productFormGroup.valueChanges.pipe(
      map(() => {
        return {
          name: this.getNameControl().value,
          carbohydratesPer100Gram: this.getCarbohydratesControl().value,
        };
      }),
    );
  }

  public getStatusChanges(): Observable<FormControlStatus> {
    return this.productFormGroup.statusChanges;
  }

  public getValid(): boolean {
    return this.productFormGroup.valid;
  }

  public getValue(): ProductFormValue {
    return {
      name: this.getNameControl().value,
      carbohydratesPer100Gram: this.getCarbohydratesControl().value,
    };
  }

  private getCarbohydratesControl(): UntypedFormControl {
    return this.productFormGroup.get(
      'carbohydratesPer100Gram',
    ) as UntypedFormControl;
  }

  private getNameControl(): UntypedFormControl {
    return this.productFormGroup.get('name') as UntypedFormControl;
  }

  private createProductFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      carbohydratesPer100Gram: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }
}
