import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MEALS_ROUTING_PATH } from '@diadev/meals';
import { PRODUCTS_ROUTING_PATH } from '@diadev/products';

enum AppPath {
  products = 'products',
  meals = 'current-meal',
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
    path: AppPath.meals,
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
    {
      provide: MEALS_ROUTING_PATH,
      useValue: AppPath.meals,
    },
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
