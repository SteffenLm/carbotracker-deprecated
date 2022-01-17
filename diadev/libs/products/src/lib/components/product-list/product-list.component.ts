import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductListPageActions } from '../../+state/products/actions/ui';
import { selectAllProducts } from '../../+state/products/selectors/products.selectors';

@Component({
  selector: 'diadev-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  public products$ = this.store.select(selectAllProducts);

  constructor(private readonly store: Store) {}

  public onSelectProduct(productId: string): void {
    this.store.dispatch(
      ProductListPageActions.selectProduct({
        productId,
      }),
    );
  }

  public onCreate(): void {
    this.store.dispatch(ProductListPageActions.createProduct());
  }
}
