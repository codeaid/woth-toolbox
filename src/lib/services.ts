import { QueryClient } from '@tanstack/react-query';
import type { FirebaseApp } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, initializeAuth } from 'firebase/auth';
import {
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';

/**
 * Instantiate the main Firebase application
 */
const createApp = () =>
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });

/**
 * Instantiate the main Firebase authenticator
 */
const createAuth = (app: FirebaseApp) => {
  const auth = initializeAuth(app);

  if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://127.0.0.1:3332', {
      disableWarnings: true,
    });
  }

  return auth;
};

/**
 * Instantiate the main Firestore application
 */
const createFirestore = (app: FirebaseApp) => {
  const firestore = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  });

  if (process.env.NODE_ENV === 'development') {
    connectFirestoreEmulator(firestore, '127.0.0.1', 3333);
  }

  return firestore;
};

// Instantiate Firebase and Firestore services
export const firebaseApp = createApp();
export const firebaseAuth = createAuth(firebaseApp);
export const firestore = createFirestore(firebaseApp);

// Create the main query client
export const queryClient = new QueryClient();
