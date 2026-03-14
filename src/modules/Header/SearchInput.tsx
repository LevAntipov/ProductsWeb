import { useEffect, useState } from "react";
import { useAppDispatch, useDebounce } from "../../shared/hooks";
import { setFilter } from "../../redux/productsReducer";
import { Input } from "../../shared/ui/Input/Input";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    dispatch(setFilter({ str: debouncedSearchValue }));
  }, [debouncedSearchValue, dispatch]);
  return (
    <Input
      type="text"
      placeholder="Search something"
      value={searchValue}
      onChange={setSearchValue}
    />
  );
};
