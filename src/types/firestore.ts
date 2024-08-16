import type { Timestamp } from 'firebase/firestore';
import type { AnimalSpecimen } from 'types/animals';
import type { Point } from 'types/generic';
import type { ExplorationMarkerId } from 'types/markers';
import type { UserSettingsKey, UserSettingsTypeMap } from 'types/settings';

// Type describing a Firestore document containing custom information about an animal map marker
export type AnimalMarkerDocument = {
  id: string;
  color?: string;
  comment?: string;
  group?: Array<AnimalSpecimen>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// Type describing a Firestore document containing a map of custom markers
export type CustomMarkerDocument = Record<CustomMarkerDocumentEntryId, Point>;
export type CustomMarkerDocumentEntryId = string | ExplorationMarkerId;

export type UserSettingsDocument<
  TKey extends UserSettingsKey = UserSettingsKey,
> = {
  key: TKey;
  value: UserSettingsTypeMap[TKey];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
