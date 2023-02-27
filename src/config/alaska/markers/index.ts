import { MarkerOptionsAnimal, MarkerOptionsGeneric } from 'types/markers';
import {
  alaskaMooseMarkers,
  americanBlackBearMarkers,
  barrenGroundCaribouMarkers,
  kodiakBearMarkers,
  rooseveltElkMarkers,
  sitkaDeerMarkers,
  surfScoterMarkers,
} from './animals';
import {
  cabinMarkers,
  campMarkers,
  flowerMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  racingMarkers,
  viewMarkers,
} from './generic';

// List of animal markers to show on the Alaska map
export const animalMarkers: Array<MarkerOptionsAnimal> = [
  alaskaMooseMarkers,
  americanBlackBearMarkers,
  barrenGroundCaribouMarkers,
  kodiakBearMarkers,
  rooseveltElkMarkers,
  sitkaDeerMarkers,
  surfScoterMarkers,
].flat();

// List of generic markers to show on the Alaska map
export const genericMarkers: Array<MarkerOptionsGeneric> = [
  cabinMarkers,
  campMarkers,
  flowerMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  racingMarkers,
  viewMarkers,
].flat();
