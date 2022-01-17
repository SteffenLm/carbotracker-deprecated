import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { ProductsEntity } from '@diadev/products';
import { ProductsSelectors } from '@diadev/products';
import { CreateMealEntryPageActions } from '../../+state/meals/actions/ui';
import { MealEntry } from '../../model/meal-entry.models';

@Component({
  selector: 'diadev-create-meal-entry',
  templateUrl: './create-meal-entry.component.html',
  styleUrls: ['./create-meal-entry.component.scss'],
})
export class CreateMealEntryComponent {
  public readonly mealEntryFormGroup: FormGroup;
  public readonly filteredProducts: Observable<ProductsEntity[]>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
  ) {
    this.mealEntryFormGroup = this.createMealEntryFormGroup();
    this.filteredProducts = combineLatest([
      this.store.select(ProductsSelectors.selectAllProducts),
      this.mealEntryFormGroup.controls.product.valueChanges.pipe(
        startWith(''),
        filter((value) => typeof value === 'string'),
      ) as Observable<string>,
    ]).pipe(
      // eslint-disable-next-line ngrx/avoid-mapping-selectors
      map(([products, currentInputValue]) => {
        const filterValue = currentInputValue.toLowerCase();
        const filteredProducts = products.filter(
          (product) => product.name.toLowerCase().indexOf(filterValue) === 0,
        );
        return filteredProducts;
      }),
    );
  }

  public onNavigateBack(): void {
    this.store.dispatch(CreateMealEntryPageActions.navigateBack());
  }

  public onClose(): void {
    this.store.dispatch(CreateMealEntryPageActions.abortMealEntryCreation());
  }
  public onSave(): void {
    const mealEntry = this.getMealEntryFromForm();
    this.store.dispatch(
      CreateMealEntryPageActions.createMealEntry({
        mealEntry,
      }),
    );
  }

  public displaySelectedProduct(product: ProductsEntity) {
    return product.name;
  }

  private createMealEntryFormGroup(): FormGroup {
    return this.formBuilder.group({
      product: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  private getMealEntryFromForm(): MealEntry {
    const selectedProduct = this.mealEntryFormGroup.controls.product
      .value as ProductsEntity;
    const enteredAmount = this.mealEntryFormGroup.controls.amount
      .value as string;
    const newMealEntry: MealEntry = {
      id: Date.now().toString(),
      name: selectedProduct.name,
      amountInGramm: +enteredAmount,
      carbohydratesPer100Gram: selectedProduct.carbohydratesPer100Gram,
    };
    return newMealEntry;
  }
}
