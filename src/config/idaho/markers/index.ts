import { MarkerOptionsAnimal, MarkerOptionsGeneric } from 'types/markers';
import {
  americanBadgerMarkers,
  americanBlackBearMarkers,
  bighornSheepMarkers,
  elkMarkers,
  grayWolfMarkers,
  lesserScoupMarkers,
  mooseMarkers,
  mountainGoatMarkers,
  muleDeerMarkers,
  pheasantMarkers,
  redFoxMarkers,
  rossGooseMarkers,
  snowshoeHareMarkers,
  whiteTailedDeerMarkers,
  wildDuckMarkers,
} from './animals';
import {
  cabinMarkers,
  campMarkers,
  echoMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  shootingRangeMarkers,
  viewMarkers,
} from './generic';

// List of animal markers to show on the Nex Perce map
export const animalMarkers: Array<MarkerOptionsAnimal> = [
  americanBadgerMarkers,
  americanBlackBearMarkers,
  bighornSheepMarkers,
  elkMarkers,
  grayWolfMarkers,
  lesserScoupMarkers,
  mooseMarkers,
  mountainGoatMarkers,
  muleDeerMarkers,
  pheasantMarkers,
  redFoxMarkers,
  rossGooseMarkers,
  snowshoeHareMarkers,
  whiteTailedDeerMarkers,
  wildDuckMarkers,
].flat();

// List of generic markers to show on the Nex Perce map
export const genericMarkers: Array<MarkerOptionsGeneric> = [
  cabinMarkers,
  campMarkers,
  echoMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  shootingRangeMarkers,
  viewMarkers,
].flat();
