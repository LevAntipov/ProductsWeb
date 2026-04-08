import type { ProductId, ProductType } from '@entities/product/model/types';
import { ProductCard } from '@entities/product/ui/ProductCard';

import classes from './ProductsPage.module.css';

type Props = {
  products: ProductType[];
  quantities: Record<number, number>;
  onOpenProduct: (id: ProductId) => void;
};

export const ProductsList = ({ products, quantities, onOpenProduct }: Props) => {
  return (
    <div className={classes.container}>
      {products?.length ? (
        products?.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            id={item.id}
            quantity={quantities[item.id]}
            onOpen={onOpenProduct}
          />
        ))
      ) : (
        <div>No products</div>
      )}
    </div>
  );
};
