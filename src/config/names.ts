import { AnimalActivity, AnimalType } from 'types/animals';
import { GenericMarkerType } from 'types/markers';

// List of animal activity types and their human-readable representations
export const animalActivityNameMap = new Map<AnimalActivity, string>([
  [AnimalActivity.Drinking, 'Drinking'],
  [AnimalActivity.Feeding, 'Feeding'],
  [AnimalActivity.Sleeping, 'Sleeping'],
]);

// List of animal types and their names
export const animalNameMap = new Map<AnimalType, string>([
  ['animal:american badger', 'American Badger'],
  ['animal:american black bear', 'American Black Bear'],
  ['animal:bighorn sheep', 'Bighorn Sheep'],
  ['animal:brown bear', 'Brown Bear'],
  ['animal:chamois', 'Chamois'],
  ['animal:elk', 'Elk'],
  ['animal:eurasian badger', 'Eurasian Badger'],
  ['animal:european hare', 'European Hare'],
  ['animal:fallow deer', 'Fallow Deer'],
  ['animal:golden jackal', 'Golden Jackal'],
  ['animal:gray wolf', 'Gray Wolf'],
  ['animal:greylag goose', 'Greylag Goose'],
  ['animal:lesser scaup', 'Lesser Scaup'],
  ['animal:moose', 'Moose'],
  ['animal:mouflon', 'Mouflon'],
  ['animal:mountain goat', 'Mountain Goat'],
  ['animal:mule deer', 'Mule Deer'],
  ['animal:pheasant', 'Pheasant'],
  ['animal:red deer', 'Red Deer'],
  ['animal:red fox', 'Red Fox'],
  ['animal:roe deer', 'Roe Deer'],
  ['animal:ross goose', 'Ross Goose'],
  ['animal:showshoe hare', 'Showshoe Hare'],
  ['animal:white-tailed deer', 'White-Tailed Deer'],
  ['animal:wild boar', 'Wild Boar'],
  ['animal:wild duck', 'Wild Duck'],
]);

// List of generic marker types and their names
export const genericNameMap = new Map<GenericMarkerType, string>([
  ['cabin', 'Cabin'],
  ['cabin:undiscovered', 'Cabin (undiscovered)'],
  ['camp', 'Camp'],
  ['echo', 'Echo'],
  ['hunting stand', 'Hunting stand'],
  ['lodge', 'Lodge'],
  ['photo', 'Photo'],
  ['shooting range', 'Shooting range'],
  ['view', 'View'],
]);
