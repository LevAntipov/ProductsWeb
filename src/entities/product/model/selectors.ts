import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@app/appStore';

import { productsApi } from '../api/product-api';

export const selectFilterStr = (state: RootState) => state.products.filterSearch;
export const selectFilterMethod = (state: RootState) => state.products.filterMethod;
export const selectProducts = (state: RootState) =>
  productsApi.endpoints.getProducts.select()(state)?.data;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectFilterStr, selectFilterMethod],
  (products, str, method) => {
    if (!products) return [];

    let filtered;
    if (str === null || str === '') {
      filtered = products;
    } else {
      const lower = str.toLowerCase();
      filtered = products.filter((item) => item.title.toLowerCase().includes(lower));
    }

    if (method === 'no filter') {
      return filtered;
    }
    if (method === 'high to low') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    if (method === 'low to high') {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (method === 'popularity filter') {
      return [...filtered].sort((a, b) => b.rating.count - a.rating.count);
    }
    if (method === 'raiting filter') {
      return [...filtered].sort((a, b) => b.rating.rate - a.rating.rate);
    }
    return products;
  }
);
