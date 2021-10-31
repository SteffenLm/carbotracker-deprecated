import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsEntity } from '../+state/products/products.models';
import { CreateProductComponent } from '../components/create-product/create-product.component';
import { EditProductComponentComponent } from '../components/edit-product-component/edit-product-component.component';

@Injectable()
export class ProductsDialogService {
  constructor(private readonly matDialog: MatDialog) {}

  public openEditProductDialog(affectedProduct: ProductsEntity): void {
    this.matDialog.open(EditProductComponentComponent, {
      data: affectedProduct,
    });
  }

  public openCreateProductDialog(): void {
    this.matDialog.open(CreateProductComponent);
  }
}
