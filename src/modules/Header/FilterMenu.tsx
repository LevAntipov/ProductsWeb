import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../shared/hooks";
import type { FilterMethodType } from "../../types";
import { setFilter } from "../../redux/productsReducer";
import showMoreIcon from "../../assets/showMoreIcon.png";
import selectedIcon from "../../assets/selectedIcon.png";
import classes from "./Header.module.css";

interface FilterMenuProps {
  options: string[];
}

export const FilterMenu = ({ options }: FilterMenuProps) => {
  const dispatch = useAppDispatch();
  const [filterMenuFlag, setFilterMenuFlag] = useState(false);
  const [chosenFilter, setChosenFilter] =
    useState<FilterMethodType>("no filter");

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(event.target as Node)) {
        setFilterMenuFlag(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFilterMenuClick = (filter: FilterMethodType) => {
    setChosenFilter(filter);
    dispatch(setFilter({ method: filter }));
    setFilterMenuFlag(false);
  };

  return (
    <div className={classes.filterMenuWrapper} ref={menuRef}>
      <div
        className={classes.filterButton}
        onClick={() => setFilterMenuFlag((prev) => !prev)}
      >
        <span className={classes.filter}>
          {chosenFilter}
          <img
            className={
              filterMenuFlag ? classes.showMoreIconDown : classes.showMoreIconUp
            }
            src={showMoreIcon}
            alt="Toggle filter menu"
          />
        </span>
      </div>

      <div
        className={filterMenuFlag ? classes.filterMethods : classes.nonSelected}
      >
        {options.map((item) => (
          <div
            key={item}
            onClick={() => handleFilterMenuClick(item as FilterMethodType)}
            className={chosenFilter === item ? classes.chosenFilter : undefined}
          >
            {item}
            {chosenFilter === item && <img src={selectedIcon} alt="Selected" />}
          </div>
        ))}
      </div>
    </div>
  );
};
