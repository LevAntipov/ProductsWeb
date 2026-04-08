import { useEffect, useState } from 'react';

export const useDebounce = <T extends number | string>(value: T, delay: number = 200): T => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    if (value == 0) {
      setDebounced(value);
      return;
    }
    let id = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
};
