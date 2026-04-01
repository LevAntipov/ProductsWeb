import classes from './Header.module.css';

export const BurgerMenu = () => {
  return (
    <button type="button" className={classes.burgerContainer} aria-label="Открыть меню">
      <span className={classes.burger}></span>
    </button>
  );
};
