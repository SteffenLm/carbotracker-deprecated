import { Component } from '@angular/core';
import { ProductsFacade } from '../../+state/products/products.facade';
import { ProductsEntity } from '../../+state/products/products.models';

@Component({
  selector: 'diadev-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  public products$ = this.productsFacade.allProducts$;

  constructor(private readonly productsFacade: ProductsFacade) {}

  public onListItemClicked(clickedProduct: ProductsEntity): void {
    this.productsFacade.setSelectedProduct(clickedProduct.id);
  }

  public onAddButtonClicked(): void {
    this.productsFacade.openCreateProductDialog();
  }
}
