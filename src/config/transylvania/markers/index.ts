import { MarkerOptionsAnimal, MarkerOptionsGeneric } from 'types/markers';
import animals from './animals.json';
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
export const animalMarkers = animals as Array<MarkerOptionsAnimal>;

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
