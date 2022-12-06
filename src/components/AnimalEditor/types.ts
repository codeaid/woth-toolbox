import { AnimalMarkerData, AnimalMarkerOptions } from 'types/markers';

export type AnimalEditorCloseHandler = () => void;
export type AnimalEditorDataClearHandler = (
  marker: AnimalMarkerOptions,
) => void;
export type AnimalEditorDataReadHandler = (
  marker: AnimalMarkerOptions,
) => Optional<AnimalMarkerData>;
export type AnimalEditorDataWriteHandler = (
  marker: AnimalMarkerOptions,
  data: AnimalMarkerData,
) => void;

export interface AnimalEditorProps {
  defaultIconColor?: string;
  marker?: AnimalMarkerOptions;
  onClose: AnimalEditorCloseHandler;
  onDataClear: AnimalEditorDataClearHandler;
  onDataRead: AnimalEditorDataReadHandler;
  onDataWrite: AnimalEditorDataWriteHandler;
}
