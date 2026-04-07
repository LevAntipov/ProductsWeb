import { FILTER_OPTIONS } from '@features/product/filter-products/config/options';
import { FilterMenu } from '@features/product/filter-products/ui/FilterMenu';
import { SearchInput } from '@features/product/search-input/ui/SearchInput';

import classes from './Header.module.css';

export const SearchBlock = () => {
  return (
    <div className={classes.searchBlock}>
      <FilterMenu options={FILTER_OPTIONS} />
      <SearchInput />
    </div>
  );
};
