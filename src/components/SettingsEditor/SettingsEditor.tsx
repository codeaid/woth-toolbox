import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import type { ButtonProps } from 'components/Button';
import { Heading } from 'components/Heading';
import { Modal } from 'components/Modal';
import { useSettings, useTranslator } from 'hooks';
import { SettingsEditorLanguage } from './SettingsEditorLanguage';
import { SettingsEditorMarkers } from './SettingsEditorMarkers';
import { SettingsEditorMigration } from './SettingsEditorMigration';
import type { SettingsEditorProps } from './types';
import styles from './SettingsEditor.module.css';

export const SettingsEditor = (props: SettingsEditorProps) => {
  const { visible = false, onClose } = props;

  // Flag indicating whether migration modal is currently visible
  const [migrationVisible, setMigrationVisible] = useState(false);

  // Get settings reset handler
  const { onSettingsClearAsync } = useSettings();

  // Retrieve application translator
  const translate = useTranslator();

  /**
   * Handle clearing all settings
   */
  const { mutate: handleReset, isPending: isResetting } = useMutation({
    mutationKey: [],
    mutationFn: async () => {
      await onSettingsClearAsync();
      onClose();
    },
  });

  // Modal actions
  const actions = useMemo<Array<ButtonProps>>(
    () => [
      {
        children: translate('UI:RESET'),
        className: styles.SettingsEditorResetButton,
        disabled: isResetting,
        onClick: () => handleReset(),
      },
    ],
    [handleReset, isResetting, translate],
  );

  return (
    <Modal
      actions={actions}
      className={styles.SettingsEditorModal}
      header={translate('UI:SETTINGS')}
      visible={visible}
      onClose={onClose}
    >
      <Heading size={5}>{translate('UI:LANGUAGE')}</Heading>
      <SettingsEditorLanguage />

      <Heading size={5}>{translate('UI:MARKERS')}</Heading>
      <SettingsEditorMarkers />

      <Heading size={5}>{translate('TOOLBOX:DATA_MIGRATION')}</Heading>
      <SettingsEditorMigration
        visible={migrationVisible}
        onToggle={setMigrationVisible}
      />
    </Modal>
  );
};
