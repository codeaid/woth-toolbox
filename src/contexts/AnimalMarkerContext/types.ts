import type { MarkerDataAnimal, MarkerOptionsAnimal } from 'types/markers';

export interface AnimalMarkerContextValue {
  markers: Record<string, MarkerDataAnimal>;
  onCreateData: (marker: MarkerOptionsAnimal, data: MarkerDataAnimal) => void;
  onDeleteData: (marker: MarkerOptionsAnimal) => void;
  onReadData: (marker: MarkerOptionsAnimal) => Optional<MarkerDataAnimal>;
  onReload: () => void;
}
