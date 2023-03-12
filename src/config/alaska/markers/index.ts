import { MarkerOptionsAnimal, MarkerOptionsGeneric } from 'types/markers';
import animals from './animals.json';
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
export const animalMarkers = animals as Array<MarkerOptionsAnimal>;

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
