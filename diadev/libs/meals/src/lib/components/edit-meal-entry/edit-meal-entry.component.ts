import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EditMealEntryPageActions } from '../../+state/meals/actions/ui';
import { selectSelectedMealEntry } from '../../+state/meals/selectors/meals.selectors';
import { MealEntry } from '../../model/meal-entry.models';

@Component({
  selector: 'diadev-edit-meal-entry',
  templateUrl: './edit-meal-entry.component.html',
  styleUrls: ['./edit-meal-entry.component.scss'],
})
export class EditMealEntryComponent {
  public selectedMealEntry$: Observable<MealEntry> = this.store
    .select(selectSelectedMealEntry)
    .pipe(
      tap((v) =>
        this.mealEntryFormGroup.setValue({
          product: v.name,
          amount: v.amountInGramm,
        }),
      ),
    );
  public readonly mealEntryFormGroup: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
  ) {
    this.mealEntryFormGroup = this.createMealEntryFormGroup();
  }

  public onNavigateBack(): void {
    this.store.dispatch(EditMealEntryPageActions.navigateBack());
  }

  public onDelete(mealEntryId: string): void {
    this.store.dispatch(
      EditMealEntryPageActions.deleteMealEntry({ mealEntryId }),
    );
  }

  public onSave(): void {
    this.store.dispatch(EditMealEntryPageActions.updateMealEntry());
  }

  private createMealEntryFormGroup(): FormGroup {
    return this.formBuilder.group({
      product: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required],
      ],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }
}
