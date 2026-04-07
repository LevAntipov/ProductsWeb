import { useEffect, useState } from 'react';

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
