export interface ProductRaw {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating_rate: number;
  rating_count: number;
  createdAt: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  createdAt: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  title: string;
  price: number;
  image: string;
}

export interface CartTotals {
  price: number;
  quantity: number;
}
