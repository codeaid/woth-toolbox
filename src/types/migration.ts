import { MarkerOptionsAnimal } from 'types/markers';

export interface MarkerDistanceResult {
  distance: number;
  target: MarkerOptionsAnimal;
}

export interface MarkerMatchResult {
  marker: MarkerOptionsAnimal;
  matches: Array<MarkerOptionsAnimal>;
}

export interface MigrationResult {
  code: string;
  count: number;
}
