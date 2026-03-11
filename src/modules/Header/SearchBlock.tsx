import type { FilterMethodType } from "../../types";
import { FilterMenu } from "./FilterMenu";
import { SearchInput } from "./SearchInput";
import classes from "./Header.module.css";

const FILTER_OPTIONS: FilterMethodType[] = [
  "no filter",
  "low to high",
  "high to low",
  "popularity filter",
  "raiting filter",
];

export const SearchBlock = () => {
  return (
    <div className={classes.searchBlock}>
      <FilterMenu options={FILTER_OPTIONS} />
      <SearchInput />
    </div>
  );
};
