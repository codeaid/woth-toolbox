import {
  americanBadgerMarkers,
  americanBlackBearMarkers,
  bighornSheepMarkers,
  grayWolfMarkers,
  mooseMarkers,
  mountainGoatMarkers,
  pheasantMarkers,
} from 'config/idaho';
import { AnimalMarkerOptions } from 'types/markers';

export const animalMarkers: Array<AnimalMarkerOptions> = [
  americanBadgerMarkers,
  americanBlackBearMarkers,
  bighornSheepMarkers,
  grayWolfMarkers,
  mooseMarkers,
  mountainGoatMarkers,
  pheasantMarkers,
].flat();
