import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCTS_ROUTING_PATH } from '../model/products-routing.model';

@Injectable()
export class ProductsRoutingService {
  constructor(
    @Inject(PRODUCTS_ROUTING_PATH) private readonly urlBasePath: string,
    private readonly router: Router,
  ) {
    console.log(urlBasePath);
  }

  public navigateToProductsPage(): void {
    this.router.navigate([this.urlBasePath]);
  }

  public navigateToCreatePage(): void {
    this.router.navigate([this.urlBasePath, 'create']);
  }

  public navigateToEditPage(productId: string): void {
    this.router.navigate([this.urlBasePath, productId]);
  }
}
