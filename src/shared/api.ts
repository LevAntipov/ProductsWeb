import type { CartItem } from "@entities/cart/model/types";
import type { ProductType } from "@entities/product/model/types";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export type GetCartResponse = {
  items: CartItem[];
  price: number;
  quantity: number;
};

export type AddCartItemRequest = {
  productId: number;
  quantity?: number;
};

export type UpdateCartItemRequest = {
  itemId: number;
  quantity: number;
};

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3005/api/",
  credentials: "include",
  prepareHeaders: (headers) => headers,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Cart", "CartItem", "Product"],
  endpoints: () => ({}),
});

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductType[], void>({
      query: () => "products",
    }),
    getProduct: build.query<ProductType, string>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<GetCartResponse, void>({
      query: () => "cart",
      providesTags: (result) =>
        result
          ? [
              { type: "Cart", id: "CURRENT" },
              ...result.items.map((item) => ({
                type: "CartItem" as const,
                id: item.id,
              })),
            ]
          : [{ type: "Cart", id: "CURRENT" }],
    }),

    addCartItem: build.mutation<{ ok: true }, AddCartItemRequest>({
      query: (body) => ({
        url: "cart/items",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Cart", id: "CURRENT" }],
    }),

    updateCartItem: build.mutation<
      { ok: true; removed?: true },
      UpdateCartItemRequest
    >({
      query: ({ itemId, quantity }) => ({
        url: `cart/items/${itemId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Cart", id: "CURRENT" },
        { type: "CartItem", id: arg.itemId },
      ],
    }),

    deleteCartItem: build.mutation<{ ok: true }, number>({
      query: (itemId) => ({
        url: `cart/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, itemId) => [
        { type: "Cart", id: "CURRENT" },
        { type: "CartItem", id: itemId },
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

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
