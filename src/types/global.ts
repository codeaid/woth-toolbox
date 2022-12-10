export type ApplicationSettings = {
  animalMarkerSize: number;
  genericMarkerSize: number;
  zoneMarkerSize: number;
};

export type EntityGroup<T> = {
  entities: Array<T>;
  tier: number;
};
