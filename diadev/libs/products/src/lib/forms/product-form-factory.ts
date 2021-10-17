import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ProductFormFactory {
  constructor(private readonly formBuilder: FormBuilder) {}

  createEditProductFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      carbohydratesPer100Gram: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }
}
