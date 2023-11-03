import type { MarkerDataAnimal, MarkerOptionsAnimal } from 'types/markers';

type HuntingMapAnimalContextToggleEditorHandler = (
  marker: MarkerOptionsAnimal,
  visible: boolean,
  source: string,
) => void;

export interface HuntingMapAnimalContextProps {
  enabled: boolean;
  marker: MarkerOptionsAnimal;
  markerData?: MarkerDataAnimal;
  markerElement?: Nullable<HTMLElement>;
  onToggleEditor: HuntingMapAnimalContextToggleEditorHandler;
}
