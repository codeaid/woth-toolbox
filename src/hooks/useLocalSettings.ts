'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  settingsCurrentKeyMap,
  storageClearSettingsAsync,
  storageDeleteSettingsValueAsync,
  storageReadSettingsListAsync,
  storageUpdateSettingsValueAsync,
} from 'lib/storage';
import { userSettingsKeysPermanent } from 'types/settings';
import type { UserSettingsKey, UserSettingsTypeMap } from 'types/settings';
import { useStorage } from './useStorage';

/**
 * Application setting storage manager
 */
export const useLocalSettings = () => {
  // Flag indicating whether settings have been fully initialized
  const [initialized, setInitialized] = useState(false);

  // Application settings storage
  const [settings, setSettings] = useState(new Map<UserSettingsKey, unknown>());

  // Browser storage manager
  const storage = useStorage();

  /**
   * Handle retrieving a settings value
   */
  const handleRead = useCallback(
    <T extends unknown>(key: UserSettingsKey, fallback: T) =>
      (settings.get(key) ?? fallback) as T,
    [settings],
  );

  /**
   * Handle deleting a stored settings value
   */
  const handleDeleteAsync = useCallback(
    async (key: UserSettingsKey) => {
      // Ensure storage is available before proceeding
      if (!storage) {
        return;
      }

      setSettings(current => {
        const replacement = new Map(current);
        replacement.delete(key);
        return replacement;
      });

      await storageDeleteSettingsValueAsync(storage, key);
    },
    [storage],
  );

  /**
   * Handle settings being changed
   */
  const handleUpdateAsync = useCallback(
    async <TKey extends UserSettingsKey>(
      key: TKey,
      value?: UserSettingsTypeMap[TKey],
    ) => {
      // Ensure storage is available before proceeding
      if (!storage) {
        return;
      }

      const legacyKey = settingsCurrentKeyMap[key];
      if (key !== 'tutorial:completed' && !legacyKey) {
        return;
      }

      // Delete values that are being unset
      if (typeof value === 'undefined') {
        return await handleDeleteAsync(key);
      }

      // Update local settings
      setSettings(current => {
        const replacement = new Map(current);
        replacement.set(key, value);
        return replacement;
      });

      // Persist application settings to storage
      await storageUpdateSettingsValueAsync(storage, key, value);
    },
    [handleDeleteAsync, storage],
  );

  /**
   * Handle clearing all stored settings
   */
  const handleClearAsync = useCallback(async () => {
    // Ensure storage is available before proceeding
    if (!storage) {
      return;
    }

    setSettings(current =>
      [...current.keys()].reduce((acc, key) => {
        if ((userSettingsKeysPermanent as unknown as string[]).includes(key)) {
          return acc;
        }

        acc.delete(key);
        return acc;
      }, new Map(current)),
    );

    await storageClearSettingsAsync(storage);
  }, [storage]);

  // Load initial application settings
  useEffect(() => {
    // Ensure storage is available before proceeding
    if (!storage) {
      return;
    }

    // Read application settings from the storage
    storageReadSettingsListAsync(storage).then(list => {
      const map = list.reduce(
        (acc, entry) => acc.set(entry.key, entry.value),
        new Map<UserSettingsKey, unknown>(),
      );

      setSettings(map);
      setInitialized(true);
    });
  }, [storage]);

  return {
    initialized,
    onSettingsClearAsync: handleClearAsync,
    onSettingsDeleteAsync: handleDeleteAsync,
    onSettingsRead: handleRead,
    onSettingsUpdateAsync: handleUpdateAsync,
  };
};
