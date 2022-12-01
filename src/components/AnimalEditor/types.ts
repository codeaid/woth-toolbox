import { AnimalMarkerData, AnimalMarkerOptions } from 'types/markers';

type AnimalEditorChangeHandler = (key: string, data?: AnimalMarkerData) => void;
type AnimalEditorCloseHandler = () => void;

export interface AnimalEditorProps {
  animal?: AnimalMarkerOptions;
  defaultIconColor?: string;
  onChange: AnimalEditorChangeHandler;
  onClose: AnimalEditorCloseHandler;
}
