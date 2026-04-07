import type { ProductId } from '@entities/product/model/types';

export interface CartItem {
  id: number;
  productId: ProductId;
  quantity: number;
  title: string;
  price: number;
  image?: string | null;
}

export type ProductsQuantity = number;

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
