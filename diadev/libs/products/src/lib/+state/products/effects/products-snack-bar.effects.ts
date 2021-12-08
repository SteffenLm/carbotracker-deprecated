import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import {
  ProductCreatePageActions,
  ProductEditPageActions,
} from '../actions/ui';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProductsSnackBarEffects {
  saveStateToLocalStorage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          ProductCreatePageActions.saveProduct,
          ProductEditPageActions.updateProduct,
          ProductEditPageActions.deleteProduct,
        ),
        tap(() => this.matSnackBar.open('products updated')),
      );
    },
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly matSnackBar: MatSnackBar,
  ) {}
}
