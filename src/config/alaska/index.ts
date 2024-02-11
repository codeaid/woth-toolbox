import {
  buildAnimalMarkers,
  buildGenericMarkers,
  buildLabelMarkers,
} from 'lib/markers';
import type {
  JsonAnimalDocument,
  JsonLabelDocument,
  JsonMarkerDocument,
} from 'types/json';
import animals from './animals.json';
import generic from './generic.json';
import labels from './labels.json';

export const animalMarkers = buildAnimalMarkers(animals as JsonAnimalDocument);
export const genericMarkers = buildGenericMarkers(
  generic as JsonMarkerDocument,
);
export const mapLabels = buildLabelMarkers(labels as JsonLabelDocument);
