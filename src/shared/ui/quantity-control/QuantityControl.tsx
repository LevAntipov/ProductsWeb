import classes from './QuantityControl.module.css';

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement?: () => void;
  disabled?: boolean;
}

export const QuantityControl = ({
  quantity,
  onIncrement,
  onDecrement,
  disabled,
}: QuantityControlProps) => {
  const isDisabled = disabled ? classes.disabled : '';
  return (
    <div className={classes.buttonsBlock}>
      <button
        className={`${classes.decreaseButton} ${isDisabled}`}
        type="button"
        onClick={onDecrement}
        disabled={disabled}
      >
        -
      </button>
      <span className={classes.quantity}>{quantity}</span>
      <button
        className={`${classes.increaseButton} ${isDisabled}`}
        type="button"
        onClick={onIncrement}
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
};
