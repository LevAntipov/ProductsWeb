import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from 'app/store';

export const useDebounce = <T extends number | string>(value: T, delay: number = 200): T => {
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
