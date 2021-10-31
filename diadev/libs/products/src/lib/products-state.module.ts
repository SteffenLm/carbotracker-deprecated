import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProducts from './+state/products/products.reducer';
import { ProductsEffects } from './+state/products/products.effects';
import { ProductsFacade } from './+state/products/products.facade';
import { ProductsPersistenceEffects } from './+state/products-persistence/products-persistence.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.reducer,
    ),
    EffectsModule.forFeature([ProductsEffects, ProductsPersistenceEffects]),
  ],
  providers: [ProductsFacade],
  declarations: [],
})
export class ProductsStateModule {}
