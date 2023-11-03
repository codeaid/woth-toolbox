import type { RefObject } from 'react';
import type { AnimalSpecimen } from 'types/animals';
import type { Point } from 'types/generic';
import type {
  IconType,
  IconTypeAnimal,
  IconTypeGeneric,
  IconTypeMarker,
  IconTypeNeedZone,
} from 'types/icons';

// Type describing a storage record containing custom information about an  animal map marker
export type MarkerData = {
  color?: string;
  comment?: string;
  created?: number;
  updated?: number;
};

// Type describing a storage record containing custom information about an animal map marker
export type MarkerDataAnimal = MarkerData & {
  group?: Array<AnimalSpecimen>;
};

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
  [key: string]: any;
};

// Type describing an animal map marker object
export type MarkerOptionsAnimal = MarkerOptions<MarkerTypeAnimal> & {
  drink: Array<MarkerOptionsZoneDrink>;
  eat: Array<MarkerOptionsZoneEat>;
  sleep: Array<MarkerOptionsZoneSleep>;
};

// Type describing a custom map marker object
export type MarkerOptionsCustom = MarkerOptions<MarkerTypeCustom>;

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
  element?: Nullable<HTMLElement>;
  setHidden: (hidden: boolean) => void;
  setVisible: (visible: boolean) => void;
}

// Type describing a marker reference object exposed by HuntingMapAnimal component
export type MarkerRefAnimal = MarkerRef & {
  setData: (data?: MarkerDataAnimal) => void;
  setEditorActive: (visible: boolean) => void;
  setZonesVisible: (visible: boolean) => void;
};

// Base type describing an object that contains marker options and
// an HTML element that represents them on the map
export type MarkerReference<
  TMarkerType extends MarkerType = MarkerType,
  TMarkerOptions extends
    MarkerOptions<TMarkerType> = MarkerOptions<TMarkerType>,
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

// Alias types to abstract icon names away from marker types
export type MarkerType = IconType;
export type MarkerTypeAnimal = IconTypeAnimal;
export type MarkerTypeCustom = IconTypeMarker;
export type MarkerTypeGeneric = IconTypeGeneric;
export type MarkerTypeNeedZone = IconTypeNeedZone;
