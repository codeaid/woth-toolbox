export type Settings = {
  animalMarkerRatings?: boolean;
  animalMarkerSize?: number;
  genericMarkerSize?: number;
  locale?: string;
  zoneMarkerSize?: number;
};

export type SettingsChangeHandler = (settings?: Settings) => void;
