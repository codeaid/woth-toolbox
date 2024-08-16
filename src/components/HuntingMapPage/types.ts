import type { MapLabelOptions, MapId } from 'types/cartography';
import type { TranslationKey } from 'types/i18n';
import type { AnimalMarker, GenericMarker } from 'types/markers';

export interface HuntingMapPageProps {
  animalMarkers: Array<AnimalMarker>;
  genericMarkers: Array<GenericMarker>;
  mapHeight?: number;
  mapId: MapId;
  mapImageSrc: string;
  mapLabels: Array<MapLabelOptions>;
  mapWidth?: number;
  titleKey: TranslationKey;
}
