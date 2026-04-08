import { api } from '@shared/api/base-api';

import type { AddCartItemRequest, GetCartResponse, UpdateCartItemRequest } from '../model/types';

export const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<GetCartResponse, void>({
      query: () => 'cart',
      providesTags: (result) =>
        result
          ? [
              { type: 'Cart', id: 'CURRENT' },
              ...result.items.map((item) => ({
                type: 'CartItem' as const,
                id: item.id,
              })),
            ]
          : [{ type: 'Cart', id: 'CURRENT' }],
    }),

    addCartItem: build.mutation<{ ok: true }, AddCartItemRequest>({
      query: (body) => ({
        url: 'cart/items',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Cart', id: 'CURRENT' }],
    }),

    updateCartItem: build.mutation<{ ok: true; removed?: true }, UpdateCartItemRequest>({
      query: ({ itemId, quantity }) => ({
        url: `cart/items/${itemId}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Cart', id: 'CURRENT' },
        { type: 'CartItem', id: arg.itemId },
      ],
    }),

    deleteCartItem: build.mutation<{ ok: true }, number>({
      query: (itemId) => ({
        url: `cart/items/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, itemId) => [
        { type: 'Cart', id: 'CURRENT' },
        { type: 'CartItem', id: itemId },
      ],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
