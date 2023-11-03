import { useCallback, useEffect, useRef, useState } from 'react';
import type { SettingsContextValue } from 'contexts';
import {
  clearSettingsStorage,
  readSettingsStorage,
  writeSettingsStorage,
} from 'lib/storage';
import { sendGoogleEvent } from 'lib/tracking';
import type { Settings } from 'types/app';
import { useStorage } from './useStorage';

/**
 * Application setting storage manager
 *
 * @param flushDelayMs Flush delay in milliseconds
 */
export const useSettingsManager = (
  flushDelayMs = 500,
): SettingsContextValue => {
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
  const handleChange = useCallback(
    (patch?: Settings) => {
      // Ensure storage is available before proceeding
      if (!storage) {
        return;
      }

      // Clear settings storage
      if (!patch) {
        clearSettingsStorage(storage);
        setSettings(undefined);

        // Send custom Google Analytics event
        sendGoogleEvent('settings_reset');
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
        writeSettingsStorage(storage, replacement);

        // Send custom Google Analytics events
        Object.entries(patch).forEach(([key, value]) => {
          switch (key as keyof Settings) {
            case 'animalMarkerRatings':
              return sendGoogleEvent('settings_markers_animal_rating', {
                value,
              });
            case 'animalMarkerSize':
              return sendGoogleEvent('settings_markers_animal', { value });
            case 'genericMarkerSize':
              return sendGoogleEvent('settings_markers_general', { value });
            case 'locale':
              return sendGoogleEvent('settings_language', { value });
            case 'zoneMarkerSize':
              return sendGoogleEvent('settings_markers_need_zone', { value });
          }
        });
      }, flushDelayMs);
    },
    [flushDelayMs, settings, storage],
  );

  /**
   * Reload settings from the storage
   */
  const handleReload = useCallback(() => {
    // Ensure storage is available before proceeding
    if (!storage) {
      return;
    }

    // Read application settings from the storage
    const settings = readSettingsStorage(storage);
    setSettings(settings);
    setInitialized(true);
  }, [storage]);

  // Load initial application settings
  useEffect(() => handleReload(), [handleReload]);

  return {
    initialized,
    settings,
    onChange: handleChange,
    onReload: handleReload,
  };
};
