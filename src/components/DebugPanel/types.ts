import { AnimalType } from 'types/animals';
import { IconType } from 'types/icons';
import { MarkerOptionsAnimal } from 'types/markers';

export interface DebugPanelSettings {
  drinkZoneCount: number;
  eatZoneCount: number;
  enabled: boolean;
  open: boolean;
  sleepZoneCount: number;
  type: AnimalType;
}

type DebugPanelAnimalListSelectHandler = (type: AnimalType) => void;
type DebugPanelIndexHandler = (index: number) => void;
type DebugPanelMarkerHandler = (marker: MarkerOptionsAnimal) => void;
type DebugPanelMarkerZoneHandler = (
  marker: MarkerOptionsAnimal,
  index: number,
) => void;
type DebugPanelSettingsHandler = (settings: DebugPanelSettings) => void;
type DebugPanelVoidHandler = () => void;

export interface DebugPanelAnimalListProps {
  selected: AnimalType;
  onSelect: DebugPanelAnimalListSelectHandler;
}

export interface DebugPanelIconRowProps {
  caption: string;
  completedCount: number;
  disabled: boolean;
  totalCount: number;
  iconType: IconType;
  onZoneRemove: DebugPanelIndexHandler;
}

export interface DebugPanelMarkerProps {
  marker: MarkerOptionsAnimal;
  onDelete: DebugPanelMarkerHandler;
  onDrinkZoneRemove: DebugPanelMarkerZoneHandler;
  onEatZoneRemove: DebugPanelMarkerZoneHandler;
  onSleepZoneRemove: DebugPanelMarkerZoneHandler;
}

export interface DebugPanelProps {
  currentMarker?: MarkerOptionsAnimal;
  enabled?: boolean;
  markers: Array<MarkerOptionsAnimal>;
  onClear: DebugPanelVoidHandler;
  onCopy: DebugPanelVoidHandler;
  onDrinkZoneRemove: DebugPanelMarkerZoneHandler;
  onEatZoneRemove: DebugPanelMarkerZoneHandler;
  onMarkerDelete: DebugPanelMarkerHandler;
  onSettingsChange: DebugPanelSettingsHandler;
  onSleepZoneRemove: DebugPanelMarkerZoneHandler;
}
