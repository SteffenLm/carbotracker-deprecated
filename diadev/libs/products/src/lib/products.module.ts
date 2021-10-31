import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '@diadev/ui';
import { ProductsMaterialModule } from './products-material.module';
import { ProductsStateModule } from './products-state.module';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductsDialogService } from './services/products-dialog.service';
import { ProductListComponent } from './components/product-list/product-list.component';
import { EditProductComponentComponent } from './components/edit-product-component/edit-product-component.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsMaterialModule,
    ProductsRoutingModule,
    ProductsStateModule,
    UiModule,
  ],
  providers: [ProductsDialogService],
  declarations: [ProductListComponent, EditProductComponentComponent, CreateProductComponent],
})
export class ProductsModule {}
