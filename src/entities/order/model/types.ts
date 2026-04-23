export interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
}

export interface OrderDetails {
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  title: string;
  image: string;
}

export interface GetOrdersResponse {
  orders: Order[];
}

export interface GetOrderDetailsResponse {
  items: OrderDetails[];
}

export type CheckoutResponse = {
  message: string;
  orderId: number;
  totalAmount: number;
};
