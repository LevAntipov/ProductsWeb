import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "app/store";

export const useDebounce = (value: string, delay: number) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    let id = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
