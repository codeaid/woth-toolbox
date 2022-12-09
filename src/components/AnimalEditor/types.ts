import { AnimalMarkerData, AnimalMarkerOptions } from 'types/markers';

export type AnimalEditorCloseHandler = () => void;
export type AnimalEditorDataClearHandler = (
  marker: AnimalMarkerOptions,
) => void;
type AnimalEditorDataChangeHandler = (data: AnimalMarkerData) => void;
export type AnimalEditorDataReadHandler = (
  marker: AnimalMarkerOptions,
) => Optional<AnimalMarkerData>;
export type AnimalEditorDataWriteHandler = (
  marker: AnimalMarkerOptions,
  data: AnimalMarkerData,
) => void;

export interface AnimalEditorColorPickerProps {
  data?: AnimalMarkerData;
  defaultIconColor?: string;
  marker?: AnimalMarkerOptions;
  onChange: AnimalEditorDataChangeHandler;
}

export interface AnimalEditorDescriptionProps {
  data?: AnimalMarkerData;
  onChange: AnimalEditorDataChangeHandler;
}

export interface AnimalEditorProps {
  defaultIconColor?: string;
  marker?: AnimalMarkerOptions;
  onClose: AnimalEditorCloseHandler;
  onDataClear: AnimalEditorDataClearHandler;
  onDataRead: AnimalEditorDataReadHandler;
  onDataWrite: AnimalEditorDataWriteHandler;
}

export interface AnimalEditorGroupBuilderProps {
  data?: AnimalMarkerData;
  onChange: AnimalEditorDataChangeHandler;
}
