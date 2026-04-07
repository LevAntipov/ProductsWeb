import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@app/appStore';

import { selectFilterStr } from '@entities/product/model/selectors';
import { setFilterSearch } from '@entities/product/model/slice';

import { useDebounce } from '@shared/lib/hooks';
import { Input } from '@shared/ui/Input/Input';

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const filterStr = useAppSelector(selectFilterStr);

  const [searchValue, setSearchValue] = useState<string>(filterStr);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    dispatch(setFilterSearch(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  return (
    <Input
      type="text"
      placeholder="Search something"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
};
