import { useNavigate } from 'react-router';

import { useSelector } from 'react-redux';

import { useCartQuantitiesMap } from '@entities/cart/model/useCartQuantitiesMap';
import { useGetProductsQuery } from '@entities/product/api/product-api';
import { selectFilteredProducts } from '@entities/product/model/selectors';

import { Loader } from '@shared/ui/Loader/Loader';

import { ProductsList } from './ProductsList';

export const ProductsPage = () => {
  const navigate = useNavigate();

  const { chosenProducts } = useCartQuantitiesMap();

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
          quantities={chosenProducts ?? {}}
          onOpenProduct={openProduct}
        />
      )}
    </>
  );
};
