import { MarkerOptionsAnimal, MarkerOptionsGeneric } from 'types/markers';
import {
  alaskaMooseMarkers,
  americanBlackBearMarkers,
  barrenGroundCaribouMarkers,
  greyWolfMarkers,
  kodiakBearMarkers,
  lesserScaupMarkers,
  mountainGoatMarkers,
  redFoxMarkers,
  rooseveltElkMarkers,
  sitkaDeerMarkers,
  showshoeHareMarkers,
  surfScoterMarkers,
  wildDuckMarkers,
  woodBisonMarkers,
} from './animals';
import {
  cabinMarkers,
  campMarkers,
  flowerMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  parkingMarkers,
  racingMarkers,
  viewMarkers,
} from './generic';

// List of animal markers to show on the Alaska map
export const animalMarkers: Array<MarkerOptionsAnimal> = [
  alaskaMooseMarkers,
  americanBlackBearMarkers,
  barrenGroundCaribouMarkers,
  greyWolfMarkers,
  kodiakBearMarkers,
  lesserScaupMarkers,
  mountainGoatMarkers,
  redFoxMarkers,
  rooseveltElkMarkers,
  sitkaDeerMarkers,
  showshoeHareMarkers,
  surfScoterMarkers,
  wildDuckMarkers,
  woodBisonMarkers,
].flat();

// List of generic markers to show on the Alaska map
export const genericMarkers: Array<MarkerOptionsGeneric> = [
  cabinMarkers,
  campMarkers,
  flowerMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  parkingMarkers,
  racingMarkers,
  viewMarkers,
].flat();
