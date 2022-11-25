import { MarkerType } from 'types/markers';

export const iconMap: Partial<Record<MarkerType, string>> = {
  'cabin': 'cabin',
  'cabin:undiscovered': 'cabin_undiscovered',
  'camp': 'camp',
  'echo': 'echo',
  'hunting stand': 'hunting_stand',
  'lodge': 'lodge',
  'photo': 'photo',
  'shooting range': 'shooting_range',
  'view': 'view',
  'zone:drink': 'zones/drink',
  'zone:eat': 'zones/eat',
  'zone:gather': 'zones/gather',
  'zone:path': 'zones/path',
  'zone:sleep': 'zones/sleep',
};
