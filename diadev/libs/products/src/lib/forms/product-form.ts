import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export class ProductForm<T> {
  constructor(
    private readonly productFormGroup: FormGroup,
    private readonly setValues$: Observable<T>,
  ) {
    this.setValues$.subscribe((newValue) => {
      this.productFormGroup.reset(newValue);
    });
  }

  public getAsFormGroup(): FormGroup {
    return this.productFormGroup;
  }

  public isValid(): Observable<boolean> {
    return this.productFormGroup.statusChanges.pipe(
      map(() => this.productFormGroup.valid),
      startWith(false),
    );
  }
}
