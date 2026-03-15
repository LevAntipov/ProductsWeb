import classes from "./ProductsPage.module.css";
import { ProductCard } from "@entities/product/ui/ProductCard/ProductCard";

type Props = {
  ids: number[];
  quantities: Record<number, number>;
  onOpenProduct: (id: number) => void;
};

export const ProductsList = ({ ids, quantities, onOpenProduct }: Props) => {
  return (
    <div className={classes.container}>
      {ids.map((id) => (
        <ProductCard
          key={id}
          id={id}
          quantity={quantities[id]}
          onOpen={() => onOpenProduct(id)}
        />
      ))}
    </div>
  );
};
