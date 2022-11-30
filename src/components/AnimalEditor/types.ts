import { AnimalMarkerOptions } from 'types/markers';

type AnimalEditorCloseHandler = () => void;

export interface AnimalEditorProps {
  animal?: AnimalMarkerOptions;
  onClose: AnimalEditorCloseHandler;
}
