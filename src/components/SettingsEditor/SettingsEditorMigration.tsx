import { useCallback, useState } from 'react';
import { Button } from 'components/Button';
import { useTranslator } from 'hooks';
import { SettingsEditorMigrationModal } from './SettingsEditorMigrationModal';
import styles from './SettingsEditorMigration.module.css';

export const SettingsEditorMigration = () => {
  // Flag indicating whether the modal is currently visible
  const [visible, setVisible] = useState(false);

  // Retrieve application translator
  const translate = useTranslator();

  /**
   * Handle hiding migration modal
   */
  const handleModalHide = useCallback(() => setVisible(false), []);

  /**
   * Handle showing migration modal
   */
  const handleModalShow = useCallback(() => setVisible(true), []);

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
