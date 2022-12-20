import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SettingsManagerContextValue } from 'contexts';
import {
  clearSettingsStore,
  readSettingsStore,
  writeSettingsStore,
} from 'lib/storage';
import { Settings } from 'types/app';
import { useStorage } from './useStorage';

/**
 * Application setting storage manager
 *
 * @param flushDelayMs Flush delay in milliseconds
 */
export const useSettingsManager = (flushDelayMs = 500) => {
  // Flag indicating whether settings have been fully initialized
  const [initialized, setInitialized] = useState(false);

  // Application settings storage
  const [settings, setSettings] = useState<Settings>();

  // Browser storage manager
  const storage = useStorage();

  // Settings update handle reference
  const timeout = useRef(0);

  /**
   * Handle settings being changed
   */
  const handleSettingsChange = useCallback(
    (patch?: Settings) => {
      // Ensure storage is available before proceeding
      if (!storage) {
        return;
      }

      // Clear settings storage
      if (!patch) {
        clearSettingsStore(storage);
        setSettings(undefined);
        return;
      }

      // Build object replacing current settings
      const replacement: Settings = {
        ...settings,
        ...patch,
      };

      // Update local settings
      setSettings(replacement);

      // Cancel any previously scheduled updates
      clearTimeout(timeout.current);

      // Schedule storage update
      timeout.current = window.setTimeout(() => {
        // Persist application settings to storage
        writeSettingsStore(storage, replacement);
      }, flushDelayMs);
    },
    [flushDelayMs, settings, storage],
  );

  // Load initial application settings
  useEffect(() => {
    // Ensure storage is available before proceeding
    if (!storage) {
      return;
    }

    // Read application settings from the storage
    const settings = readSettingsStore(storage);
    setSettings(settings);
    setInitialized(true);
  }, [storage]);

  return useMemo<SettingsManagerContextValue>(
    () => ({
      initialized,
      settings,
      onSettingsChange: handleSettingsChange,
    }),
    [handleSettingsChange, initialized, settings],
  );
};
