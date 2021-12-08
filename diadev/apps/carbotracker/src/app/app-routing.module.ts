import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PRODUCTS_ROUTING_PATH } from '@diadev/products';

enum AppPath {
  products = 'products',
  currentMeal = 'current-meal',
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppPath.products,
  },
  {
    path: AppPath.products,
    loadChildren: () =>
      import('@diadev/products').then((m) => m.ProductsModule),
  },
  {
    path: AppPath.currentMeal,
    loadChildren: () => import('@diadev/meals').then((m) => m.MealsModule),
  },
  {
    path: '**',
    redirectTo: AppPath.products,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    {
      provide: PRODUCTS_ROUTING_PATH,
      useValue: AppPath.products,
    },
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
