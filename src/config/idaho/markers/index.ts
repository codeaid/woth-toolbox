import { MarkerOptionsAnimal, MarkerOptionsGeneric } from 'types/markers';
import animals from './animals.json';
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
export const animalMarkers = animals as Array<MarkerOptionsAnimal>;

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
