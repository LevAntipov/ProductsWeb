import { combineReducers } from '@reduxjs/toolkit';

import cartReducer from '@entities/cart/model/slice';
import productsReducer from '@entities/product/model/slice';

import ordersReducer from '@features/order/expand-order-details/model/slice';

import { api } from '@shared/api/base-api';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  products: productsReducer,
  carts: cartReducer,
  orders: ordersReducer,
});
