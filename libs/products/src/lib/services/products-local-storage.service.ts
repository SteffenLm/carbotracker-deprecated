import { Injectable } from '@angular/core';
import { LocalStorageManager } from '@diadev/localstorage';
import {
  ProductsState,
  PRODUCTS_FEATURE_KEY,
} from '../+state/products/model/products-state.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsLocalStorageService extends LocalStorageManager<ProductsState> {
  constructor() {
    super(PRODUCTS_FEATURE_KEY);
  }
}
