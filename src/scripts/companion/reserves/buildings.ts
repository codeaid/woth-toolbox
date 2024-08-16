import { genericMarkers as africaLabels } from 'config/africa';
import { genericMarkers as alaskaLabels } from 'config/alaska';
import {
  genericMarkerTranslationMap,
  mapTypeTranslationMap,
} from 'config/i18n';
import { genericMarkers as idahoLabels } from 'config/idaho';
import { genericMarkers as lintukotoLabels } from 'config/lintukoto';
import { genericMarkers as newZealandLabels } from 'config/new-zealand';
import { genericMarkers as transylvaniaLabels } from 'config/transylvania';
import type { MapId } from 'types/cartography';
import type { GenericMarker, GenericMarkerType } from 'types/markers';

const validTypes: GenericMarkerType[] = [
  'camp',
  'hunting stand',
  'lodge',
  'cabin',
];

const createOutput = (markers: GenericMarker[], mapType: MapId) =>
  markers
    .filter(marker => validTypes.includes(marker.type))
    .map(marker => ({
      ID: marker.id,
      BUILDING: genericMarkerTranslationMap.get(marker.type),
      RESERVE: mapTypeTranslationMap.get(mapType),
      X: marker.coords[0],
      Y: marker.coords[1],
    }));

export default [
  ...createOutput(africaLabels, 'africa'),
  ...createOutput(alaskaLabels, 'alaska'),
  ...createOutput(idahoLabels, 'idaho'),
  ...createOutput(lintukotoLabels, 'lintukoto'),
  ...createOutput(newZealandLabels, 'new-zealand'),
  ...createOutput(transylvaniaLabels, 'transylvania'),
];
