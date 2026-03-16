import type { ProductId } from "@entities/product/model/types";

export type ProductCartItemType = {
  id: ProductId;
  quantity: ProductsQuantity;
};

export type ProductsQuantity = number;
