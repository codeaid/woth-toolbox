import {
  badgerMarkers,
  bighornSheepMarkers,
  mountainGoatMarkers,
} from 'config/idaho';
import { AnimalMarkerOptions } from 'types/markers';

export const animalMarkers: Array<AnimalMarkerOptions> = [
  badgerMarkers,
  bighornSheepMarkers,
  mountainGoatMarkers,
].flat();
