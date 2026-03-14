import classes from "./QuantityControl.module.css";

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement?: () => void;
}

export const QuantityControl = ({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityControlProps) => {
  return (
    <div className={classes.buttonsBlock}>
      <button
        className={classes.decreaseButton}
        type="button"
        onClick={onDecrement}
      >
        -
      </button>
      <span className={classes.quantity}>{quantity}</span>
      <button
        className={classes.increaseButton}
        type="button"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
};
