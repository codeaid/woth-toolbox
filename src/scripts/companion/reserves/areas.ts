import { mapLabels as africaLabels } from 'config/africa';
import { mapLabels as alaskaLabels } from 'config/alaska';
import { mapTypeTranslationMap } from 'config/i18n';
import { mapLabels as idahoLabels } from 'config/idaho';
import { mapLabels as newZealandLabels } from 'config/new-zealand';
import { mapLabels as transylvaniaLabels } from 'config/transylvania';
import type { MapLabelOptions, MapType } from 'types/cartography';

type Coords = [number, number];

const clampCoords = (coords: Coords): Coords => {
  const clampedX = coords[0] < 0.1 ? 0.1 : coords[0] > 0.9 ? 0.9 : coords[0];
  const clampedY =
    coords[1] < 0.05 ? 0.05 : coords[1] > 0.95 ? 0.95 : coords[1];
  return [clampedX, clampedY];
};

const createOutput = (labels: MapLabelOptions[], mapType: MapType) =>
  labels.map(label => {
    const [clampedX, clampedY] = clampCoords(label.coords as Coords);

    return {
      ID: label.name,
      RESERVE: mapTypeTranslationMap.get(mapType),
      HABITAT: label.habitat,
      X: clampedX,
      Y: clampedY,
    };
  });

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...createOutput(africaLabels, 'africa'),
  ...createOutput(alaskaLabels, 'alaska'),
  ...createOutput(idahoLabels, 'idaho'),
  ...createOutput(newZealandLabels, 'new-zealand'),
  ...createOutput(transylvaniaLabels, 'transylvania'),
];
