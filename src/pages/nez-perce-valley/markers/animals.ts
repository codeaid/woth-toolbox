import {
  badgerMarkers,
  bighornSheepMarkers,
  mooseMarkers,
  mountainGoatMarkers,
} from 'config/idaho';
import { AnimalMarkerOptions } from 'types/markers';

export const animalMarkers: Array<AnimalMarkerOptions> = [
  badgerMarkers,
  bighornSheepMarkers,
  mooseMarkers,
  mountainGoatMarkers,
].flat();
