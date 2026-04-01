import { useNavigate } from 'react-router';

import { useSelector } from 'react-redux';

import { selectFilteredProducts } from '@entities/product/model/selectors';
import type { ProductId } from '@entities/product/model/types';

import { useGetCartQuery, useGetProductsQuery } from '@shared/api';
import { Loader } from '@shared/ui/Loader/Loader';

import { ProductsList } from './ProductsList';

export const ProductsPage = () => {
  const navigate = useNavigate();

  const { data: cart } = useGetCartQuery();
  const chosenProducts = cart?.items.reduce(
    (acc, item) => {
      acc[item.productId] = item.quantity;
      return acc;
    },
    {} as Record<ProductId, number>
  );

  const { data: products, isLoading } = useGetProductsQuery();

  const filteredProducts = useSelector(selectFilteredProducts);

  const openProduct = (id: number) => {
    navigate(`/products/${id}`);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {products && (
        <ProductsList
          products={filteredProducts}
          quantities={chosenProducts}
          onOpenProduct={openProduct}
        />
      )}
    </>
  );
};
