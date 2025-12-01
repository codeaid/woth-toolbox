'use client';

import type { PropsWithChildren } from 'react';
import { useCallback } from 'react';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { useLocalSettings } from 'hooks';
import { sendGoogleEvent } from 'lib/tracking';
import type { UserSettingsKey, UserSettingsTypeMap } from 'types/settings';
import { SettingsContext } from './SettingsContext';

export const SettingsProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const {
    initialized,
    onSettingsClearAsync: onLocalSettingsClearAsync,
    onSettingsRead,
    onSettingsUpdateAsync: onLocalSettingsUpdateAsync,
  } = useLocalSettings();

  /**
   * Update value of the specified configuration key
   */
  const handleUpdateAsync = useCallback(
    async <TKey extends UserSettingsKey>(
      key: TKey,
      value?: UserSettingsTypeMap[TKey],
    ) => {
      await onLocalSettingsUpdateAsync(key, value);

      // Send Google tracking event
      switch (key) {
        case 'marker:animal:ratings':
          return sendGoogleEvent('settings_markers_animal_rating', { value });
        case 'marker:animal:size':
          return sendGoogleEvent('settings_markers_animal', { value });
        case 'marker:generic:size':
          return sendGoogleEvent('settings_markers_general', { value });
        case 'locale':
          return sendGoogleEvent('settings_language', { value });
        case 'marker:zone:size':
          return sendGoogleEvent('settings_markers_need_zone', { value });
      }
    },
    [onLocalSettingsUpdateAsync],
  );

  /**
   * Handle retrieving a settings value
   */
  const handleGetValue = useCallback(
    <TKey extends UserSettingsKey>(
      key: TKey,
      fallback: UserSettingsTypeMap[TKey],
    ) => onSettingsRead(key, fallback),
    [onSettingsRead],
  );

  if (!initialized || typeof window === 'undefined') {
  return <LoadingOverlay />;
}

  return (
    <SettingsContext.Provider
      value={{
        onSettingsClearAsync: onLocalSettingsClearAsync,
        onSettingsRead: handleGetValue,
        onSettingsUpdateAsync: handleUpdateAsync,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
