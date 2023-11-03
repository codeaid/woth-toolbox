import { useCallback } from 'react';
import { Button } from 'components/Button';
import { useTranslator } from 'hooks';
import { SettingsEditorMigrationModal } from './SettingsEditorMigrationModal';
import type { SettingsEditorMigrationProps } from './types';
import styles from './SettingsEditorMigration.module.css';

export const SettingsEditorMigration = (
  props: SettingsEditorMigrationProps,
) => {
  const { visible, onToggle } = props;

  // Retrieve application translator
  const translate = useTranslator();

  /**
   * Handle hiding migration modal
   */
  const handleModalHide = useCallback(() => onToggle(false), [onToggle]);

  /**
   * Handle showing migration modal
   */
  const handleModalShow = useCallback(() => onToggle(true), [onToggle]);

  return (
    <>
      <Button
        className={styles.SettingsEditorMigrationOpen}
        onClick={handleModalShow}
      >
        {translate('UI:OPEN')}
      </Button>

      <SettingsEditorMigrationModal
        visible={visible}
        onClose={handleModalHide}
      />
    </>
  );
};
