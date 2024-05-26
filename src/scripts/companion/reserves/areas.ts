import { mapLabels as africaLabels } from 'config/africa';
import { mapLabels as alaskaLabels } from 'config/alaska';
import { mapTypeTranslationMap } from 'config/i18n';
import { mapLabels as idahoLabels } from 'config/idaho';
import { mapLabels as newZealandLabels } from 'config/new-zealand';
import { mapLabels as transylvaniaLabels } from 'config/transylvania';
import type { MapLabelOptions, MapType } from 'types/cartography';

const createOutput = (labels: MapLabelOptions[], mapType: MapType) =>
  labels.map(label => ({
    ID: label.name,
    RESERVE: mapTypeTranslationMap.get(mapType),
    HABITAT: label.habitat,
    X: label.coords[0],
    Y: label.coords[1],
  }));

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...createOutput(africaLabels, 'africa'),
  ...createOutput(alaskaLabels, 'alaska'),
  ...createOutput(idahoLabels, 'idaho'),
  ...createOutput(newZealandLabels, 'new-zealand'),
  ...createOutput(transylvaniaLabels, 'transylvania'),
];
