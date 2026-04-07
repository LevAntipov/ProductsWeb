import { api } from '@shared/api/base-api';

import type { ProductType } from '../model/types';

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductType[], void>({
      query: () => 'products',
    }),
    getProduct: build.query<ProductType, string>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
