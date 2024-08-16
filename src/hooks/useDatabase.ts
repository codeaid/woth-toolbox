'use client';

import { useEffect, useState } from 'react';
import { createDatabaseAsync } from 'lib/db';

export const useDatabase = () => {
  // Main application IndexedDB instance
  const [db, setDb] = useState<IDBDatabase>();

  // Initialise database on mount
  useEffect(() => {
    createDatabaseAsync().then(setDb);
  }, []);

  return db;
};
