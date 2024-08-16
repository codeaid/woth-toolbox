export const userSettingsKeys = [
  'locale',
  'marker:animal:ratings',
  'marker:animal:size',
  'marker:generic:size',
  'marker:zone:size',
] as const;

export const userSettingsKeysPermanent = ['tutorial:completed'] as const;

export type UserSettingsKey =
  | (typeof userSettingsKeys)[number]
  | (typeof userSettingsKeysPermanent)[number];

export type UserSettingsTypeMap = {
  'locale': string;
  'marker:animal:ratings': boolean;
  'marker:animal:size': number;
  'marker:generic:size': number;
  'marker:zone:size': number;
  'tutorial:completed': boolean;
};

export type UserSettings<TKey extends UserSettingsKey = UserSettingsKey> = {
  key: TKey;
  value: UserSettingsTypeMap[TKey];
};
