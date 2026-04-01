export type ProductId = number;

export type ProductType = {
  id: ProductId;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
};

export type FilterMethodType =
  | 'no filter'
  | 'low to high'
  | 'high to low'
  | 'raiting filter'
  | 'popularity filter';
