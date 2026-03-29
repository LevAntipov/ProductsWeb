import type { ProductType } from "@entities/product/model/types";
import classes from "./ProductsPage.module.css";
import { ProductCard } from "@entities/product/ui/ProductCard/ProductCard";

type Props = {
  products: ProductType[];
  quantities?: Record<number, number>;
  onOpenProduct: (id: number) => void;
};

export const ProductsList = ({
  products,
  quantities,
  onOpenProduct,
}: Props) => {
  return (
    <div className={classes.container}>
      {products?.length ? (
        products?.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            id={item.id}
            quantity={quantities[item.id]}
            onOpen={() => onOpenProduct(item.id)}
          />
        ))
      ) : (
        <div>No products</div>
      )}
    </div>
    // <div className={classes.container}>
    //   {ids.length ? (
    //     ids.map((id) => (
    //       <ProductCard
    //         key={id}
    //         id={id}
    //         quantity={quantities[id]}
    //         onOpen={() => onOpenProduct(id)}
    //       />
    //     ))
    //   ) : (
    //     <div>No products</div>
    //   )}
    // </div>
  );
};
