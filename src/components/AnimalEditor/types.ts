import type { AnimalMarkerRecord, AnimalMarker } from 'types/markers';

export type AnimalEditorCloseHandler = () => void;
export type AnimalEditorDataClearHandler = (marker: AnimalMarker) => void;
type AnimalEditorDataChangeHandler = (
  data: Partial<AnimalMarkerRecord>,
) => void;
export type AnimalEditorDataReadHandler = (
  marker: AnimalMarker,
) => Promise<Optional<AnimalMarkerRecord>>;
export type AnimalEditorDataWriteHandler = (
  marker: AnimalMarker,
  data: AnimalMarkerRecord,
) => Promise<void>;

export interface AnimalEditorColorPickerProps {
  data?: AnimalMarkerRecord;
  defaultIconColor?: string;
  marker?: AnimalMarker;
  onChange: AnimalEditorDataChangeHandler;
}

export interface AnimalEditorDescriptionProps {
  data?: AnimalMarkerRecord;
  disabled?: boolean;
  onChange: AnimalEditorDataChangeHandler;
}

export interface AnimalEditorProps {
  defaultIconColor?: string;
  marker?: AnimalMarker;
  record?: AnimalMarkerRecord;
  onClose: AnimalEditorCloseHandler;
  onCreateRecordAsync: (record: AnimalMarkerRecord) => Promise<void>;
  onUpdateRecordAsync: (record: AnimalMarkerRecord) => Promise<void>;
  onDeleteRecordAsync: (record: AnimalMarkerRecord) => Promise<void>;
}

export interface AnimalEditorGroupBuilderProps {
  data?: AnimalMarkerRecord;
  onChange: AnimalEditorDataChangeHandler;
}
