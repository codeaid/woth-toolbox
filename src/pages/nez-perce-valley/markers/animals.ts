import {
  badgerMarkers,
  bighornSheepMarkers,
  grayWolfMarkers,
  mooseMarkers,
  mountainGoatMarkers,
} from 'config/idaho';
import { AnimalMarkerOptions } from 'types/markers';

export const animalMarkers: Array<AnimalMarkerOptions> = [
  badgerMarkers,
  bighornSheepMarkers,
  grayWolfMarkers,
  mooseMarkers,
  mountainGoatMarkers,
].flat();
