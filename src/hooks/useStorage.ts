import { useEffect, useState } from 'react';
import { getStorage } from 'lib/storage';

/**
 * Retrieve application storage manager
 */
export const useStorage = () => {
  // Browser storage manager
  const [storage, setStorage] = useState<Storage>();

  // Create storage manager on load
  useEffect(() => {
    try {
      setStorage(getStorage());
    } catch (e) {}
  }, []);

  return storage;
};
