import { getSelectors } from '@ngrx/router-store';

export const selectProductIdRouteParam =
  getSelectors().selectRouteParam('productId');
