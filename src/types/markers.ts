import { RefObject } from 'react';
import { AnimalSpecimen } from 'types/animals';
import { Point } from 'types/generic';
import { IconType, IconTypeAnimal, IconTypeGeneric, IconTypeNeedZone } from 'types/icons';

// Base type describing a map marker object
export type MarkerOptions<TMarkerType extends MarkerType = MarkerType> = {
  coords: Point;
  id: string;
  meta?: MarkerOptionsMeta;
  type: TMarkerType;
};

// Type describing metadata associated with a marker options instance
type MarkerOptionsMeta = {
  created?: Date;
  debug?: boolean;
};

// Type describing an animal map marker object
export type MarkerOptionsAnimal = MarkerOptions<MarkerTypeAnimal> & {
  drink: Array<MarkerOptionsZoneDrink>;
  eat: Array<MarkerOptionsZoneEat>;
  id: string;
  sleep: Array<MarkerOptionsZoneSleep>;
};

// Type describing a generic map marker object
export type MarkerOptionsGeneric = MarkerOptions<MarkerTypeGeneric>;

// Union type describing every type of need zone map markers
export type MarkerOptionsZone =
  | MarkerOptionsZoneDrink
  | MarkerOptionsZoneEat
  | MarkerOptionsZoneSleep;

// Types describing need zone map marker objects
export type MarkerOptionsZoneDrink = MarkerOptions<'zone:drink'>;
export type MarkerOptionsZoneEat = MarkerOptions<'zone:eat'>;
export type MarkerOptionsZoneSleep = MarkerOptions<'zone:sleep'>;

// Type describing a marker reference object exposed by HuntingMapMarker component
export interface MarkerRef {
  setHidden: (hidden: boolean) => void;
  setVisible: (visible: boolean) => void;
}

// Type describing a marker reference object exposed by HuntingMapAnimal component
export type MarkerRefAnimal = MarkerRef & {
  setData: (data?: MarkerStorageRecordAnimal) => void;
  setEditorActive: (visible: boolean) => void;
  setZonesVisible: (visible: boolean) => void;
};

// Base type describing an object that contains marker options and
// an HTML element that represents them on the map
export type MarkerReference<
  TMarkerType extends MarkerType = MarkerType,
  TMarkerOptions extends MarkerOptions<TMarkerType> = MarkerOptions<TMarkerType>,
  TMarkerRef extends MarkerRef = MarkerRef,
> = {
  marker: TMarkerOptions;
  ref: RefObject<TMarkerRef>;
};

// Type describing an object that contains animal marker options
// and an HTML element that represents the animal icon on the map
export type MarkerReferenceAnimal = MarkerReference<
  MarkerTypeAnimal,
  MarkerOptionsAnimal,
  MarkerRefAnimal
>;

// Type describing an object that contains generic marker options
// and an HTML element that represents the animal icon on the map
export type MarkerReferenceGeneric = MarkerReference<
  MarkerTypeGeneric,
  MarkerOptionsGeneric
>;

// Type describing a storage record containing custom information about an  animal map marker
export type MarkerStorageRecord = {
  color?: string;
  comment?: string;
  created?: number;
  updated?: number;
};

// Type describing a storage record containing custom information about an animal map marker
export type MarkerStorageRecordAnimal = MarkerStorageRecord & {
  group?: Array<AnimalSpecimen>;
};

// Alias types to abstract icon names away from marker types
export type MarkerType = IconType;
export type MarkerTypeAnimal = IconTypeAnimal;
export type MarkerTypeGeneric = IconTypeGeneric;
export type MarkerTypeNeedZone = IconTypeNeedZone;
