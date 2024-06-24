import { animalMarkers as africaLabels } from 'config/africa';
import { animalMarkers as alaskaLabels } from 'config/alaska';
import { fauna } from 'config/animals';
import { mapTypeTranslationMap } from 'config/i18n';
import { animalMarkers as idahoLabels } from 'config/idaho';
import { animalMarkers as newZealandLabels } from 'config/new-zealand';
import { animalMarkers as transylvaniaLabels } from 'config/transylvania';
import type { MapType } from 'types/cartography';
import type {
  MarkerOptionsAnimal,
  MarkerTypeAnimal,
  MarkerTypeNeedZone,
} from 'types/markers';

const zoneMap = new Map<MarkerTypeNeedZone, number>([
  ['zone:eat', 0],
  ['zone:drink', 1],
  ['zone:sleep', 2],
]);

const getAnimalTranslationKey = (type: MarkerTypeAnimal) =>
  fauna.find(entry => entry.type === type)?.heading;

const createOutput = (markers: MarkerOptionsAnimal[], mapType: MapType) =>
  markers.map(marker => ({
    ID: marker.id,
    ANIMAL: getAnimalTranslationKey(marker.type),
    RESERVE: mapTypeTranslationMap.get(mapType),
    X: marker.coords[0],
    Y: marker.coords[1],
    ZONES: [...marker.eat, ...marker.drink, ...marker.sleep].map(zone => ({
      ID: zone.id,
      TYPE: zoneMap.get(zone.type),
      X: zone.coords[0],
      Y: zone.coords[1],
    })),
  }));

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...createOutput(africaLabels, 'africa'),
  ...createOutput(alaskaLabels, 'alaska'),
  ...createOutput(idahoLabels, 'idaho'),
  ...createOutput(newZealandLabels, 'new-zealand'),
  ...createOutput(transylvaniaLabels, 'transylvania'),
];
