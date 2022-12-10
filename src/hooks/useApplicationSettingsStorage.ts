import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { defaultAppSettings } from 'config/general';
import { ApplicationSettingsContextValue } from 'contexts';
import {
  clearApplicationSettings,
  getApplicationSettings,
  getStorage,
  setApplicationSettings,
} from 'lib/storage';
import { ApplicationSettings } from 'types/global';

export const useApplicationSettingsStorage =
  (): ApplicationSettingsContextValue => {
    // Settings update handle reference
    const timeout = useRef(0);

    // Application settings storage
    const [settings, setSettings] =
      useState<ApplicationSettings>(defaultAppSettings);

    // Browser storage manager
    const [storage, setStorage] = useState<Storage>();

    /**
     * Handle settings being changed
     */
    const handleSettingsChange = useCallback(
      (settings?: ApplicationSettings) => {
        // Ensure storage is available before proceeding
        if (!storage) {
          return;
        }

        // Clear settings storage
        if (!settings) {
          clearApplicationSettings(storage);
          setSettings(defaultAppSettings);
          return;
        }

        // Update local settings
        setSettings(settings);

        // Schedule storage update
        clearTimeout(timeout.current);
        timeout.current = window.setTimeout(() => {
          // Persist application settings to storage
          setApplicationSettings(storage, settings);
        }, 500);
      },
      [storage],
    );

    // Create storage manager on load
    useEffect(() => setStorage(getStorage()), []);

    // Load initial application settings
    useEffect(() => {
      // Ensure storage is available before proceeding
      if (!storage) {
        return;
      }

      const settings = getApplicationSettings(storage);
      if (settings) {
        setSettings(settings);
      }
    }, [storage]);

    return useMemo(
      () => ({
        settings,
        onSettingsChange: handleSettingsChange,
      }),
      [handleSettingsChange, settings],
    );
  };
