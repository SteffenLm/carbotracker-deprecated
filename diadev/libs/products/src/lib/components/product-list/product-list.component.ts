import { Component } from '@angular/core';
import { ProductsFacade } from '../../+state/products/products.facade';

@Component({
  selector: 'diadev-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  public products$ = this.productsFacade.allProducts$;

  constructor(private readonly productsFacade: ProductsFacade) {}
}
