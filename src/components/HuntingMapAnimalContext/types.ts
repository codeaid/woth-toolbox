import { MarkerOptionsAnimal, MarkerStorageRecordAnimal } from 'types/markers';

type HuntingMapAnimalContextToggleEditorHandler = (
  marker: MarkerOptionsAnimal,
  visible: boolean,
  source: string,
) => void;

export interface HuntingMapAnimalContextProps {
  enabled: boolean;
  marker: MarkerOptionsAnimal;
  markerData?: MarkerStorageRecordAnimal;
  markerElement?: Nullable<HTMLElement>;
  onToggleEditor: HuntingMapAnimalContextToggleEditorHandler;
}
