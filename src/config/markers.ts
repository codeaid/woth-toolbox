import { GenericMarkerType, ZoneMarkerType } from 'types/markers';

// List of generic marker types and their names
export const genericMarkerNameMap = new Map<
  GenericMarkerType | ZoneMarkerType,
  string
>([
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
