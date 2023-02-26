import { MarkerOptionsAnimal, MarkerOptionsGeneric } from 'types/markers';
import {
  brownBearMarkers,
  chamoisMarkers,
  eurasianBadgerMarkers,
  europeanHareMarkers,
  fallowDeerMarkers,
  goldenJackalMarkers,
  grayWolfMarkers,
  greylagGooseMarkers,
  mouflonMarkers,
  pheasantMarkers,
  redDeerMarkers,
  redFoxMarkers,
  roeDeerMarkers,
  wildBoarMarkers,
  wildDuckMarkers,
} from './animals';
import {
  cabinMarkers,
  campMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  photoMarkers,
  shootingRangeMarkers,
  viewMarkers,
} from './generic';

// List of animal markers to show on the Transylvania map
export const animalMarkers: Array<MarkerOptionsAnimal> = [
  brownBearMarkers,
  chamoisMarkers,
  eurasianBadgerMarkers,
  europeanHareMarkers,
  fallowDeerMarkers,
  goldenJackalMarkers,
  grayWolfMarkers,
  greylagGooseMarkers,
  mouflonMarkers,
  pheasantMarkers,
  redDeerMarkers,
  redFoxMarkers,
  roeDeerMarkers,
  wildBoarMarkers,
  wildDuckMarkers,
].flat();

// List of generic markers to show on the Transylvania map
export const genericMarkers: Array<MarkerOptionsGeneric> = [
  cabinMarkers,
  campMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  photoMarkers,
  shootingRangeMarkers,
  viewMarkers,
].flat();
