import { useCallback, useMemo, useState } from 'react';
import type { ButtonProps } from 'components/Button';
import { Heading } from 'components/Heading';
import { SidePanel } from 'components/SidePanel';
import { useTranslator } from 'hooks';
import { SettingsEditorLanguage } from './SettingsEditorLanguage';
import { SettingsEditorMarkers } from './SettingsEditorMarkers';
import { SettingsEditorMigration } from './SettingsEditorMigration';
import type { SettingsEditorProps } from './types';
import styles from './SettingsEditor.module.css';

export const SettingsEditor = (props: SettingsEditorProps) => {
  const { settings, visible = false, onChange, onClose } = props;

  // Flag indicating whether migration modal is currently visible
  const [migrationVisible, setMigrationVisible] = useState(false);

  // Retrieve application translator
  const translate = useTranslator();

  /**
   * Handle resetting application settings
   */
  const handleReset = useCallback(() => onChange(), [onChange]);

  // Side panel actions
  const actions = useMemo<Array<ButtonProps>>(
    () => [
      {
        children: translate('UI:RESET'),
        className: styles.SettingsEditorResetButton,
        onClick: handleReset,
      },
    ],
    [handleReset, translate],
  );

  return (
    <SidePanel
      actions={actions}
      className={styles.SettingsEditorSidePanel}
      closeOnEscape
      closeOnOutsideClick={!migrationVisible}
      title={translate('UI:SETTINGS')}
      visible={visible}
      onClose={onClose}
    >
      <div className={styles.SettingsEditor}>
        <Heading size={5}>{translate('UI:LANGUAGE')}</Heading>
        <SettingsEditorLanguage settings={settings} onChange={onChange} />

        <Heading size={5}>{translate('UI:MARKERS')}</Heading>
        <SettingsEditorMarkers settings={settings} onChange={onChange} />

        <Heading size={5}>{translate('TOOLBOX:DATA_MIGRATION')}</Heading>
        <SettingsEditorMigration
          visible={migrationVisible}
          onToggle={setMigrationVisible}
        />
      </div>
    </SidePanel>
  );
};
