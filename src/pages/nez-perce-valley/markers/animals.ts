import {
  americanBadgerMarkers,
  bighornSheepMarkers,
  grayWolfMarkers,
  mooseMarkers,
  mountainGoatMarkers,
} from 'config/idaho';
import { AnimalMarkerOptions } from 'types/markers';

export const animalMarkers: Array<AnimalMarkerOptions> = [
  americanBadgerMarkers,
  bighornSheepMarkers,
  grayWolfMarkers,
  mooseMarkers,
  mountainGoatMarkers,
].flat();
