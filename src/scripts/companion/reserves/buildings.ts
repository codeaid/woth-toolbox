import { genericMarkers as africaLabels } from 'config/africa';
import { genericMarkers as alaskaLabels } from 'config/alaska';
import {
  genericMarkerTranslationMap,
  mapTypeTranslationMap,
} from 'config/i18n';
import { genericMarkers as idahoLabels } from 'config/idaho';
import { genericMarkers as newZealandLabels } from 'config/new-zealand';
import { genericMarkers as transylvaniaLabels } from 'config/transylvania';
import type { MapType } from 'types/cartography';
import type { MarkerOptionsGeneric, MarkerTypeGeneric } from 'types/markers';

const validTypes: MarkerTypeGeneric[] = [
  'camp',
  'hunting stand',
  'lodge',
  'cabin',
];

const createOutput = (markers: MarkerOptionsGeneric[], mapType: MapType) =>
  markers
    .filter(marker => validTypes.includes(marker.type))
    .map(marker => ({
      ID: marker.id,
      BUILDING: genericMarkerTranslationMap.get(marker.type),
      RESERVE: mapTypeTranslationMap.get(mapType),
      X: marker.coords[0],
      Y: marker.coords[1],
    }));

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...createOutput(africaLabels, 'africa'),
  ...createOutput(alaskaLabels, 'alaska'),
  ...createOutput(idahoLabels, 'idaho'),
  ...createOutput(newZealandLabels, 'new-zealand'),
  ...createOutput(transylvaniaLabels, 'transylvania'),
];
