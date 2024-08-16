'use client';

import { onSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFirebase } from 'hooks/useFirebase';
import {
  firestoreClearSettingsAsync,
  firestoreCreateSettingsRef,
  firestoreDeleteSettingsValueAsync,
  firestoreUpdateSettingsValueAsync,
} from 'lib/firestore';
import { userSettingsKeysPermanent } from 'types/settings';
import type { UserSettingsKey, UserSettingsTypeMap } from 'types/settings';

/**
 * Application setting storage manager
 */
export const useFirestoreSettings = () => {
  // Flag indicating whether settings have been fully initialized
  const [initialized, setInitialized] = useState(false);

  // Application settings storage
  const [settings, setSettings] = useState(new Map<UserSettingsKey, unknown>());

  // Get current Firebase user identifier
  const { userId } = useFirebase();

  /**
   * Debounced callback to set a settings value
   */
  const debouncedSet = useDebouncedCallback(
    useCallback(
      async <TKey extends UserSettingsKey>(
        key: TKey,
        value: UserSettingsTypeMap[TKey],
      ) => await firestoreUpdateSettingsValueAsync(userId, key, value),
      [userId],
    ),
    3000,
  );

  /**
   * Debounced callback to delete a settings value
   */
  const debouncedDelete = useDebouncedCallback(
    useCallback(
      async (key: UserSettingsKey) =>
        await firestoreDeleteSettingsValueAsync(userId, key),
      [userId],
    ),
    3000,
  );

  /**
   * Debounced callback to reset all settings values
   */
  const debouncedClear = useDebouncedCallback(
    useCallback(
      async () => await firestoreClearSettingsAsync(userId),
      [userId],
    ),
    3000,
  );

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
      setSettings(current => {
        const replacement = new Map(current);
        replacement.delete(key);
        return replacement;
      });

      await debouncedDelete(key);
    },
    [debouncedDelete],
  );

  /**
   * Handle settings being changed
   */
  const handleUpdateAsync = useCallback(
    async <TKey extends UserSettingsKey>(
      key: TKey,
      value?: UserSettingsTypeMap[TKey],
    ) => {
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

      // Update configuration value in Firestore
      debouncedSet(key, value);
    },
    [debouncedSet, handleDeleteAsync],
  );

  /**
   * Handle clearing all stored settings
   */
  const handleClearAsync = useCallback(async () => {
    setSettings(current =>
      [...current.keys()].reduce((acc, key) => {
        if ((userSettingsKeysPermanent as unknown as string[]).includes(key)) {
          return acc;
        }

        acc.delete(key);
        return acc;
      }, new Map(current)),
    );

    await debouncedClear();
  }, [debouncedClear]);

  // Load all available configuration values on mount
  useEffect(() => {
    const settingsRef = firestoreCreateSettingsRef(userId);

    return onSnapshot(settingsRef, snapshot => {
      setSettings(current =>
        snapshot.docChanges().reduce((acc, change) => {
          const doc = change.doc.data();

          if (change.type === 'removed') {
            acc.delete(doc.key);
            return acc;
          }

          return acc.set(doc.key, doc.value);
        }, new Map(current)),
      );

      // Mark settings context as initialised
      setInitialized(true);
    });
  }, [userId]);

  return {
    initialized,
    onSettingsClearAsync: handleClearAsync,
    onSettingsDeleteAsync: handleDeleteAsync,
    onSettingsReadAsync: handleRead,
    onSettingsUpdateAsync: handleUpdateAsync,
  };
};
