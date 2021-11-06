import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'create',
    component: CreateProductComponent,
  },
  {
    path: ':productId',
    component: EditProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
