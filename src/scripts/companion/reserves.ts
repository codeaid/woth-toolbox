import africaAnimals from 'config/africa/animals.json';
import alaskaAnimals from 'config/alaska/animals.json';
import { mapTypeTranslationMap } from 'config/i18n';
import idahoAnimals from 'config/idaho/animals.json';
import newZealandAnimals from 'config/new-zealand/animals.json';
import transylvaniaAnimals from 'config/transylvania/animals.json';
import type { MapType } from 'types/cartography';

const countMap = new Map<MapType, number>([
  ['africa', Object.keys(africaAnimals).length],
  ['alaska', Object.keys(alaskaAnimals).length],
  ['idaho', Object.keys(idahoAnimals).length],
  ['new-zealand', Object.keys(newZealandAnimals).length],
  ['transylvania', Object.keys(transylvaniaAnimals).length],
]);

export default [...mapTypeTranslationMap].map(([mapType, translationKey]) => ({
  ID: translationKey,
  COUNT: countMap.get(mapType),
}));
