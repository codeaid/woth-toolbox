import type { RefObject } from 'react';
import type { explorationMarkerId } from 'config/markers';
import type { AnimalSpecimen } from 'types/animals';
import type { Point } from 'types/generic';
import type {
  IconType,
  IconTypeAnimal,
  IconTypeGeneric,
  IconTypeMarker,
  IconTypeNeedZone,
} from 'types/icons';

/**********************************************
 *            DOMAIN MODEL TYPES
 **********************************************/

// Base type describing a map marker object
export type Marker<TMarkerType extends MarkerType = MarkerType> = {
  coords: Point;
  id: string;
  type: TMarkerType;
};

// Type describing an animal map marker object
export type AnimalMarker = Marker<AnimalMarkerType> & {
  drink: Array<DrinkZoneMarker>;
  eat: Array<EatZoneMarker>;
  sleep: Array<SleepZoneMarker>;
};

// Type describing a custom map marker object
export type CustomMarker = Marker<CustomMarkerType>;
export type ExplorationMarkerId = typeof explorationMarkerId;

// Type describing a generic map marker object
export type GenericMarker = Marker<GenericMarkerType>;

// Types describing need zone map marker objects
export type DrinkZoneMarker = Marker<'zone:drink'>;
export type EatZoneMarker = Marker<'zone:eat'>;
export type SleepZoneMarker = Marker<'zone:sleep'>;

// Union type describing every type of need zone map markers
export type NeedZoneMarker = DrinkZoneMarker | EatZoneMarker | SleepZoneMarker;

// Alias types to abstract icon names away from marker types
export type MarkerType = IconType;
export type AnimalMarkerType = IconTypeAnimal;
export type CustomMarkerType = IconTypeMarker;
export type GenericMarkerType = IconTypeGeneric;
export type NeedZoneMarkerType = IconTypeNeedZone;

/**********************************************
 *                STORAGE TYPES
 **********************************************/

// Type describing a storage record containing custom information about an animal map marker
export type AnimalMarkerRecord = {
  id: string;
  color?: string;
  comment?: string;
  group?: Array<AnimalSpecimen>;
  createdAt?: Date;
  updatedAt?: Date;
};

// Type describing a local storage record containing custom information about an animal map marker
export type LocalStorageAnimalMarkerRecord = {
  color?: string;
  comment?: string;
  created?: number;
  updated?: number;
  group?: Array<AnimalSpecimen>;
};

/**********************************************
 *             HUNTING MAP TYPES
 **********************************************/

// Type describing a marker reference object exposed by HuntingMapMarker component
export interface MarkerRef {
  element?: Nullable<HTMLElement>;
  setHidden: (hidden: boolean) => void;
  setVisible: (visible: boolean) => void;
}

// Type describing a marker reference object exposed by HuntingMapAnimal component
export type AnimalMarkerRef = MarkerRef & {
  setData: (record?: AnimalMarkerRecord) => void;
  setEditorActive: (visible: boolean) => void;
  setZonesVisible: (visible: boolean) => void;
};

// Base type describing an object that contains marker options and
// an HTML element that represents them on the map
export type MarkerReference<
  TMarkerType extends MarkerType = MarkerType,
  TMarkerOptions extends Marker<TMarkerType> = Marker<TMarkerType>,
  TMarkerRef extends MarkerRef = MarkerRef,
> = {
  marker: TMarkerOptions;
  ref: RefObject<TMarkerRef | null>;
};

// Type describing an object that contains animal marker options
// and an HTML element that represents the animal icon on the map
export type AnimalMarkerReference = MarkerReference<
  AnimalMarkerType,
  AnimalMarker,
  AnimalMarkerRef
>;

// Type describing an object that contains generic marker options
// and an HTML element that represents the animal icon on the map
export type GenericMarkerReference = MarkerReference<
  GenericMarkerType,
  GenericMarker
>;
