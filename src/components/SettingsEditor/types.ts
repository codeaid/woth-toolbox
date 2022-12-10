import { ApplicationSettings } from 'types/global';

export type SettingsEditorChangeHandler = (
  settings?: ApplicationSettings,
) => void;
type SettingsEditorCloseHandler = () => void;

export interface SettingsEditorProps {
  settings: ApplicationSettings;
  visible?: boolean;
  onChange: SettingsEditorChangeHandler;
  onClose: SettingsEditorCloseHandler;
}
