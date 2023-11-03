import type { MarkerDataAnimal, MarkerOptionsAnimal } from 'types/markers';

export type AnimalEditorCloseHandler = () => void;
export type AnimalEditorDataClearHandler = (
  marker: MarkerOptionsAnimal,
) => void;
type AnimalEditorDataChangeHandler = (data: MarkerDataAnimal) => void;
export type AnimalEditorDataReadHandler = (
  marker: MarkerOptionsAnimal,
) => Optional<MarkerDataAnimal>;
export type AnimalEditorDataWriteHandler = (
  marker: MarkerOptionsAnimal,
  data: MarkerDataAnimal,
) => void;

export interface AnimalEditorColorPickerProps {
  data?: MarkerDataAnimal;
  defaultIconColor?: string;
  marker?: MarkerOptionsAnimal;
  onChange: AnimalEditorDataChangeHandler;
}

export interface AnimalEditorDescriptionProps {
  data?: MarkerDataAnimal;
  onChange: AnimalEditorDataChangeHandler;
}

export interface AnimalEditorProps {
  defaultIconColor?: string;
  marker?: MarkerOptionsAnimal;
  onClose: AnimalEditorCloseHandler;
  onDataClear: AnimalEditorDataClearHandler;
  onDataRead: AnimalEditorDataReadHandler;
  onDataWrite: AnimalEditorDataWriteHandler;
}

export interface AnimalEditorGroupBuilderProps {
  data?: MarkerDataAnimal;
  onChange: AnimalEditorDataChangeHandler;
}
