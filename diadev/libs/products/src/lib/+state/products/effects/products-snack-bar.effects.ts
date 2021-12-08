import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageApiActions } from '@diadev/products';

@Injectable()
export class ProductsSnackBarEffects {
  saveStateToLocalStorage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LocalStorageApiActions.saveProductStateToLocalStorageSuccess),
        tap(() => this.matSnackBar.open('products saved')),
      );
    },
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly matSnackBar: MatSnackBar,
  ) {}
}
