import type { MapLabelOptions, MapType } from 'types/cartography';
import type { TranslationKey } from 'types/i18n';
import type { MarkerOptionsAnimal, MarkerOptionsGeneric } from 'types/markers';

export interface HuntingMapPageProps {
  animalMarkers: Array<MarkerOptionsAnimal>;
  genericMarkers: Array<MarkerOptionsGeneric>;
  mapHeight?: number;
  mapImageSrc: string;
  mapLabels: Array<MapLabelOptions>;
  mapType: MapType;
  mapWidth?: number;
  titleKey: TranslationKey;
}
