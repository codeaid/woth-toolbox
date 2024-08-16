'use client';

import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { useDatabase, useStorage } from 'hooks';
import { firestoreInitialiseAsync } from 'lib/firestore';
import { firebaseAuth } from 'lib/services';
import { FirebaseContext } from './FirebaseContext';

export const FirebaseProvider = (props: PropsWithChildren) => {
  const { children } = props;

  // Currently authenticated Firebase user
  const [user, setUser] = useState<User | null>();

  // User identifier read from local storage
  const [userId, setUserId] = useState<string>();

  // Access the main application and storage managers
  const db = useDatabase();
  const storage = useStorage();

  // Read the current user identifier from local storage
  useEffect(() => {
    if (!db || !storage) {
      return;
    }

    firestoreInitialiseAsync(db, storage).then(setUserId);
  }, [db, storage]);

  // Authenticate with Firebase
  useEffect(() => {
    if (!userId) {
      return;
    }

    return onAuthStateChanged(firebaseAuth, setUser);
  }, [userId]);

  // Show a loading overlay while connection to Firestore is being created
  if (!db || !user || !userId) {
    return <LoadingOverlay />;
  }

  return (
    <FirebaseContext.Provider value={{ db, user, userId }}>
      {children}
    </FirebaseContext.Provider>
  );
};
