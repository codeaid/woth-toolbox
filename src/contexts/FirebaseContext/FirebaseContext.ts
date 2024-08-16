'use client';

import { createContext } from 'react';
import type { FirebaseContextValue } from './types';

export const FirebaseContext = createContext<FirebaseContextValue>(
  undefined as unknown as FirebaseContextValue,
);
