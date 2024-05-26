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

const validTypes: MarkerTypeGeneric[] = ['camp', 'hunting stand', 'lodge'];

const typeMap = new Map<MarkerTypeGeneric, number>([
  ['lodge', 0],
  ['camp', 1],
  ['hunting stand', 2],
]);

const createOutput = (markers: MarkerOptionsGeneric[], mapType: MapType) =>
  markers
    .filter(marker => validTypes.includes(marker.type))
    .map(marker => ({
      ID: genericMarkerTranslationMap.get(marker.type),
      RESERVE: mapTypeTranslationMap.get(mapType),
      TYPE: typeMap.get(marker.type),
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
