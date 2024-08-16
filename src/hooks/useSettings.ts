'use client';

import { useContext } from 'react';
import { SettingsContext } from 'contexts';

/**
 * Retrieve current application settings
 */
export const useSettings = () => useContext(SettingsContext);
