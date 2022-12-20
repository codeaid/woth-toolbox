import { Settings, SettingsChangeHandler } from 'types/app';

type SettingsEditorCloseHandler = () => void;

export interface SettingsEditorLanguageProps {
  settings: Required<Settings>;
  onChange: SettingsChangeHandler;
}

export interface SettingsEditorMarkersProps {
  settings: Required<Settings>;
  onChange: SettingsChangeHandler;
}

export interface SettingsEditorProps {
  settings: Required<Settings>;
  visible?: boolean;
  onChange: SettingsChangeHandler;
  onClose: SettingsEditorCloseHandler;
}
