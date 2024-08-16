import type { AnimalMarkerRecord, AnimalMarker } from 'types/markers';

type HuntingMapAnimalContextToggleEditorHandler = (
  marker: AnimalMarker,
  visible: boolean,
  source: string,
) => void;

export interface HuntingMapAnimalContextProps {
  enabled: boolean;
  marker: AnimalMarker;
  markerData?: AnimalMarkerRecord;
  markerElement?: Nullable<HTMLElement>;
  onToggleEditor: HuntingMapAnimalContextToggleEditorHandler;
}
