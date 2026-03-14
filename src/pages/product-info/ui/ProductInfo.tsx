import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { useEffect, useState } from "react";
import { useChangeProductQuantity } from "../../../features/product/change-product-quantity/model/useChangeProductQuantity";
import { getProduct } from "../../../redux/productsReducer";
import classes from "./ProductInfo.module.css";
import { QuantityControl } from "../../../shared/ui/quantity-control/QuantityControl";
import cardInfoIconStar from "../../../assets/cardInfoIconStar.svg";
import backToIcon from "../../../assets/backToIcon.png";

export const ProductCardInfo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(0);
  const { id = "" } = useParams<{ id: string }>();
  const { increase } = useChangeProductQuantity(+id);
  const product = useAppSelector((state) => state.products.entities?.[+id!]);
  const status = useAppSelector((state) => state.products.fetchProductStatus);

  useEffect(() => {
    if (!product) {
      dispatch(getProduct(+id));
    }
  }, []);

  const handleAddButtonClick = () => {
    if (quantity > 0) {
      increase(quantity);
      setQuantity(0);
    }
  };

  return (
    <>
      <div className={classes.backToTap} onClick={() => navigate(-1)}>
        <h4>Go back</h4>
        <img
          className={classes.backToIcon}
          src={backToIcon}
          width="20px"
          height="8px"
        ></img>
      </div>
      {product ? (
        <div className={classes.product}>
          <div className={classes.img}>
            <img src={product.image}></img>
          </div>
          <div className={classes.moreInfoBlock}>
            <div className={classes.title}>
              <h2>{product.title}</h2>
            </div>
            <div className={classes.raitingBlock}>
              <div className={classes.raiting}>
                <span>{product.rating.rate} </span>
                <span>({product.rating.count} reviews)</span>
              </div>
              <img
                className={classes.iconStar}
                width="20px"
                height="20px"
                src={cardInfoIconStar}
              ></img>
            </div>
            <div className={classes.categoryBlock}>
              <span>Category</span>
              <span className={classes.categoryBlock}>{product.category}</span>
            </div>
            <div className={classes.priceBlock}>
              <span>Price</span>
              <span className={classes.price}>${product.price}</span>
            </div>
            <div className={classes.descriptionBlock}>
              <span>Desciption</span>
              <span>{product.description}</span>
            </div>
            <div className={classes.purchachesBlock}>
              <div className={classes.quantityBlock}>
                <span>Quantity</span>
                <QuantityControl
                  quantity={quantity}
                  onIncrement={() => setQuantity((p) => p + 1)}
                  onDecrement={() => quantity >= 1 && setQuantity((p) => p - 1)}
                />
              </div>
              <button
                className={classes.addButton}
                onClick={handleAddButtonClick}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ) : status === "pending" ? (
        <div>Loading</div>
      ) : (
        <div>Something wrong</div>
      )}
    </>
  );
};
