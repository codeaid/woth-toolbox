import type { AnimalType } from 'types/animals';
import type { TranslationKey } from 'types/i18n';
import type { MarkerTypeAnimal, MarkerTypeGeneric } from 'types/markers';

// Type describing a JSON document containing animal marker data
export type JsonAnimalDocument = {
  [K in AnimalType]: Array<JsonAnimalDocumentRecord>;
};

// Type describing a JSON document containing label data
export type JsonLabelDocument = Array<JsonMarkerLabelRecord>;

// Type describing a JSON document containing generic marker data
export type JsonMarkerDocument = Array<JsonMarkerDocumentRecord>;

// Type describing an entry in an animal marker data array
export type JsonAnimalDocumentRecord = [
  MarkerTypeAnimal, // Marker identifier
  number, // Marker X coordinate
  number, // Marker Y coordinate
  Array<number>, // Drink zone coordinates
  Array<number>, // Eat zone coordinates
  Array<number>, // Sleep zone coordinates
];

// Type describing an entry in a label data array
export type JsonMarkerLabelRecord = [
  TranslationKey, // Label text
  TranslationKey, // Habitat name
  number, // Label X coordinate
  number, // Label Y coordinate
];

// Type describing an entry in a generic marker data array
export type JsonMarkerDocumentRecord = [
  MarkerTypeGeneric, // Marker type
  number, // Marker X coordinate
  number, // Marker Y coordinate
];
