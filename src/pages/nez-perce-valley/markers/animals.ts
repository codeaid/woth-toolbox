import {
  americanBadgerMarkers,
  americanBlackBearMarkers,
  bighornSheepMarkers,
  grayWolfMarkers,
  lesserScoupMarkers,
  mooseMarkers,
  mountainGoatMarkers,
  pheasantMarkers,
  rossGooseMarkers,
  wildDuckMarkers,
} from 'config/idaho';
import { AnimalMarkerOptions } from 'types/markers';

export const animalMarkers: Array<AnimalMarkerOptions> = [
  americanBadgerMarkers,
  americanBlackBearMarkers,
  bighornSheepMarkers,
  grayWolfMarkers,
  lesserScoupMarkers,
  mooseMarkers,
  mountainGoatMarkers,
  pheasantMarkers,
  rossGooseMarkers,
  wildDuckMarkers,
].flat();
