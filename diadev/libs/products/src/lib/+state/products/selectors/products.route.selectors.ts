import { getSelectors } from '@ngrx/router-store';

export const selectProductId = getSelectors().selectRouteParam('productId');
