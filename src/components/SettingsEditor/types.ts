import type { Settings, SettingsChangeHandler } from 'types/app';

type SettingsEditorMigrationModalHandler = (visible: boolean) => void;
type SettingsEditorVoidHandler = () => void;

export interface SettingsEditorLanguageProps {
  settings: Required<Settings>;
  onChange: SettingsChangeHandler;
}

export interface SettingsEditorMarkersProps {
  settings: Required<Settings>;
  onChange: SettingsChangeHandler;
}

export interface SettingsEditorMigrationProps {
  visible: boolean;
  onToggle: SettingsEditorMigrationModalHandler;
}

export interface SettingsEditorMigrationModalProps {
  visible: boolean;
  onClose: SettingsEditorVoidHandler;
}

export interface SettingsEditorProps {
  settings: Required<Settings>;
  visible?: boolean;
  onChange: SettingsChangeHandler;
  onClose: SettingsEditorVoidHandler;
}
