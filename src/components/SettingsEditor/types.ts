type SettingsEditorMigrationModalHandler = (visible: boolean) => void;
type SettingsEditorVoidHandler = () => void;

export interface SettingsEditorMigrationProps {
  visible: boolean;
  onToggle: SettingsEditorMigrationModalHandler;
}

export interface SettingsEditorMigrationModalProps {
  visible: boolean;
  onClose: SettingsEditorVoidHandler;
}

export interface SettingsEditorProps {
  visible?: boolean;
  onClose: SettingsEditorVoidHandler;
}
