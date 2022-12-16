import { Settings, SettingsChangeHandler } from 'types/app';

type SettingsEditorCloseHandler = () => void;

export interface SettingsEditorProps {
  settings: Required<Settings>;
  visible?: boolean;
  onChange: SettingsChangeHandler;
  onClose: SettingsEditorCloseHandler;
}
