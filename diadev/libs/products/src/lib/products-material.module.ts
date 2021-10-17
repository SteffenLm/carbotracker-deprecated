import { NgModule } from '@angular/core';
import {
  MatDialogConfig,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [MatListModule, MatFormFieldModule],
  exports: [MatListModule, MatFormFieldModule],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useFactory: (): MatDialogConfig => ({
        maxWidth: '95vw',
        width: '90vw',
      }),
    },
  ],
})
export class ProductsMaterialModule {}
