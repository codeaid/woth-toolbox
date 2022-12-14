import { MarkerOptionsAnimal, MarkerStorageRecordAnimal } from 'types/markers';

export type AnimalEditorCloseHandler = () => void;
export type AnimalEditorDataClearHandler = (
  marker: MarkerOptionsAnimal,
) => void;
type AnimalEditorDataChangeHandler = (data: MarkerStorageRecordAnimal) => void;
export type AnimalEditorDataReadHandler = (
  marker: MarkerOptionsAnimal,
) => Optional<MarkerStorageRecordAnimal>;
export type AnimalEditorDataWriteHandler = (
  marker: MarkerOptionsAnimal,
  data: MarkerStorageRecordAnimal,
) => void;

export interface AnimalEditorColorPickerProps {
  data?: MarkerStorageRecordAnimal;
  defaultIconColor?: string;
  marker?: MarkerOptionsAnimal;
  onChange: AnimalEditorDataChangeHandler;
}

export interface AnimalEditorDescriptionProps {
  data?: MarkerStorageRecordAnimal;
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
  data?: MarkerStorageRecordAnimal;
  onChange: AnimalEditorDataChangeHandler;
}
