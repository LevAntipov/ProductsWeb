import { api } from '@shared/api/base-api';

import type { AddCartItemRequest, GetCartResponse, UpdateCartItemRequest } from '../model/types';

export const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<GetCartResponse, void>({
      query: () => 'cart',
      providesTags: ['Cart'],
    }),

    addCartItem: build.mutation<{ ok: true }, AddCartItemRequest>({
      query: (body) => ({
        url: 'cart/items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),

    updateCartItem: build.mutation<{ ok: true; removed?: true }, UpdateCartItemRequest>({
      query: ({ itemId, quantity }) => ({
        url: `cart/items/${itemId}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),

    deleteCartItem: build.mutation<{ ok: true }, number>({
      query: (itemId) => ({
        url: `cart/items/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
