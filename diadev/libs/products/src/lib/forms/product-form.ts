import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductFormModel } from './product-form-model';

export class ProductForm {
  constructor(private readonly productFormModel: ProductFormModel) {}

  public getAsFormGroup(): FormGroup {
    return this.productFormModel.getFormGroup();
  }

  public isValid(): Observable<boolean> {
    return this.productFormModel.getStatusChanges().pipe(
      map(() => this.productFormModel.getValid()),
      startWith(false),
    );
  }
}
