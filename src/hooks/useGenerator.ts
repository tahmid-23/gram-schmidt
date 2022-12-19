import { useCallback, useState } from 'react';

export const useGenerator = <T>(generator: () => T): [T, () => void] => {
  const [value, setValue] = useState(generator());
  const regenerate = useCallback(() => {
    setValue(generator());
  }, [generator]);

  return [value, regenerate];
};
