import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductFormValue } from '../model/product-form-value.model';

export class ProductFormModel {
  private readonly productFormGroup: FormGroup = this.createProductFormGroup();

  constructor(private readonly formBuilder: FormBuilder) {}

  public getFormGroup(): FormGroup {
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

  public getStatusChanges(): Observable<void> {
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

  private getCarbohydratesControl(): FormControl {
    return this.productFormGroup.get('carbohydratesPer100Gram') as FormControl;
  }

  private getNameControl(): FormControl {
    return this.productFormGroup.get('name') as FormControl;
  }

  private createProductFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      carbohydratesPer100Gram: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }
}
