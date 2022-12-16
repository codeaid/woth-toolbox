export type Settings = {
  animalMarkerSize?: number;
  genericMarkerSize?: number;
  locale?: string;
  zoneMarkerSize?: number;
};

export type SettingsChangeHandler = (settings?: Settings) => void;
