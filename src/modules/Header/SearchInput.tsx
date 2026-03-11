import { useEffect, useState } from "react";
import { useAppDispatch, useDebounce } from "../../shared/hooks";
import { setFilter } from "../../redux/productsReducer";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    dispatch(setFilter({ str: debouncedSearchValue }));
  }, [debouncedSearchValue, dispatch]);
  return (
    <input
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      type="text"
      placeholder="Search something"
    ></input>
  );
};
