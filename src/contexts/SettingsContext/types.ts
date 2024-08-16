import type { UserSettingsKey, UserSettingsTypeMap } from 'types/settings';

export interface SettingsContextValue {
  onSettingsClearAsync: () => Promise<void>;
  onSettingsRead: <TKey extends UserSettingsKey>(
    key: TKey,
    fallback: UserSettingsTypeMap[TKey],
  ) => UserSettingsTypeMap[TKey];
  onSettingsUpdateAsync: <TKey extends UserSettingsKey>(
    key: TKey,
    value?: UserSettingsTypeMap[TKey],
  ) => Promise<void>;
}
