interface Order {
  id: 2;
  orderDate: Date;
  totalAmount: number;
}

interface OrderDetails {
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
