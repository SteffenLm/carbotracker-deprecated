import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '@diadev/ui';
import { ProductsMaterialModule } from './products-material.module';
import { ProductsStateModule } from './products-state.module';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductListComponent } from './components/product-list/product-list.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductsRoutingService } from './services/products-routing.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsMaterialModule,
    ProductsRoutingModule,
    ProductsStateModule,
    UiModule,
  ],
  declarations: [
    ProductListComponent,
    EditProductComponent,
    CreateProductComponent,
  ],
  providers: [ProductsRoutingService],
})
export class ProductsModule {}
