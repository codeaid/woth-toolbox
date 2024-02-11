import type { MapType } from 'types/cartography';
import type { TranslationKey } from 'types/i18n';

export interface Animal {
  description: TranslationKey;
  habitatPrimary: Array<AnimalHabitat>;
  habitatSecondary?: Array<AnimalHabitat>;
  heading: TranslationKey;
  hitEnergy: [number, number];
  latin: TranslationKey;
  lifeCycle: Array<AnimalActivityData>;
  maps?: Array<MapType>;
  slug: string;
  tier: number;
  type: AnimalType;
}

export type AnimalActivity = 'drinking' | 'feeding' | 'sleeping';

export interface AnimalActivityData {
  activity: AnimalActivity;
  time: number;
}

export type AnimalAge = 'young' | 'adult' | 'mature';

export type AnimalHabitat =
  | 'arid savannah and desert'
  | 'floodplain'
  | 'grassland'
  | 'grasslands and forests'
  | 'highland forest'
  | 'highlands'
  | 'lowland forest'
  | 'mountains'
  | 'rainforest'
  | 'savanna'
  | 'swamps';

export type AnimalRating = 'F' | 'M1' | 'M2' | 'M3' | 'M4' | 'M5';

export interface AnimalSpecimen {
  age: AnimalAge;
  rating: AnimalRating;
}

export type AnimalType =
  | 'animal:alaska moose'
  | 'animal:american badger'
  | 'animal:american black bear'
  | 'animal:barren-ground caribou'
  | 'animal:bighorn sheep'
  | 'animal:black wildebeest'
  | 'animal:blue wildebeest'
  | 'animal:brown bear'
  | 'animal:cape buffalo'
  | 'animal:chamois'
  | 'animal:common warthog'
  | 'animal:egyptian goose'
  | 'animal:eurasian badger'
  | 'animal:european hare'
  | 'animal:european rabbit'
  | 'animal:fallow deer'
  | 'animal:feral goat'
  | 'animal:feral pig'
  | 'animal:gemsbok'
  | 'animal:golden jackal'
  | 'animal:gray wolf'
  | 'animal:greater kudu'
  | 'animal:greylag goose'
  | 'animal:helmeted guineafowl'
  | 'animal:himalayan tahr'
  | 'animal:honey badger'
  | 'animal:kodiak bear'
  | 'animal:lesser scaup'
  | 'animal:lion'
  | 'animal:mouflon'
  | 'animal:mountain goat'
  | 'animal:mule deer'
  | 'animal:pheasant'
  | 'animal:red deer'
  | 'animal:red stag'
  | 'animal:red fox'
  | 'animal:rocky mountain elk'
  | 'animal:roe deer'
  | 'animal:roosevelt elk'
  | 'animal:ross goose'
  | 'animal:sambar deer'
  | 'animal:sika deer'
  | 'animal:sitka deer'
  | 'animal:snowshoe hare'
  | 'animal:spotted hyena'
  | 'animal:springbok'
  | 'animal:surf scoter'
  | 'animal:western moose'
  | 'animal:white-tailed deer'
  | 'animal:wild boar'
  | 'animal:wild duck'
  | 'animal:wood bison';
