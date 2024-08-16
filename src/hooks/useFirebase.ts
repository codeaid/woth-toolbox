'use client';

import { useContext } from 'react';
import { FirebaseContext } from 'contexts';

export const useFirebase = () => useContext(FirebaseContext);
