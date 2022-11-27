import { AnimalActivity, AnimalType } from 'types/animals';
import { GenericIconType } from 'types/icons';

// List of animal activity types and their human-readable representations
export const animalActivityNameMap = new Map<AnimalActivity, string>([
  [AnimalActivity.Drinking, 'Drinking'],
  [AnimalActivity.Feeding, 'Feeding'],
  [AnimalActivity.Sleeping, 'Sleeping'],
]);

// List of animal types and their names
export const animalNameMap = new Map<AnimalType, string>([
  ['animal:american badger', 'American badger'],
  ['animal:american black bear', 'American black bear'],
  ['animal:bighorn sheep', 'Bighorn sheep'],
  ['animal:brown bear', 'Brown bear'],
  ['animal:chamois', 'Chamois'],
  ['animal:elk', 'Elk'],
  ['animal:eurasian badger', 'Eurasian badger'],
  ['animal:european hare', 'European hare'],
  ['animal:fallow deer', 'Fallow deer'],
  ['animal:golden jackal', 'Golden jackal'],
  ['animal:gray wolf', 'Gray wolf'],
  ['animal:greylag goose', 'Greylag goose'],
  ['animal:lesser scaup', 'Lesser scaup'],
  ['animal:moose', 'Moose'],
  ['animal:mouflon', 'Mouflon'],
  ['animal:mountain goat', 'Mountain goat'],
  ['animal:mule deer', 'Mule deer'],
  ['animal:pheasant', 'Pheasant'],
  ['animal:red deer', 'Red deer'],
  ['animal:red fox', 'Red fox'],
  ['animal:roe deer', 'Roe deer'],
  ['animal:ross goose', "Ross's goose"],
  ['animal:showshoe hare', 'Showshoe hare'],
  ['animal:white-tailed deer', 'White-tailed deer'],
  ['animal:wild boar', 'Wild boar'],
  ['animal:wild duck', 'Wild duck'],
]);

// List of generic marker types and their names
export const genericNameMap = new Map<GenericIconType, string>([
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
