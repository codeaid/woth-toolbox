'use client';

import { useEffect, useState } from 'react';
import { getStorage } from 'lib/storage';

/**
 * Retrieve application storage manager
 */
export const useStorage = () => {
  // Browser storage manager
  const [storage, setStorage] = useState<Storage | undefined>(
    typeof window !== 'undefined' ? getStorage() : undefined
  );

  // Create storage manager on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        setStorage(getStorage());
      } catch (e) {
        console.error('Failed to initialize storage:', e);
      }
    }
  }, []);

  return storage;
};
