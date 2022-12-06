import { useCallback, useState } from 'react';

/**
 * Create a function allowing to trigger component rerender
 */
export const useForceUpdate = () => {
  const [value, setValue] = useState(0);

  return [value, useCallback(() => setValue(Date.now()), [])] as [
    number,
    () => void,
  ];
};
