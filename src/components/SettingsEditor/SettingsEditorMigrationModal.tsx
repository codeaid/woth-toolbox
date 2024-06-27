import { useCallback, useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Textarea } from 'components/Textarea';
import {
  useAnimalMarkers,
  useCustomMarkers,
  useSettings,
  useStorage,
  useTranslator,
} from 'hooks';
import { setClipboardValue } from 'lib/clipboard';
import { readSerializedStore, writeSerializedStorage } from 'lib/storage';
import { sendGoogleEvent } from 'lib/tracking';
import { showNotification } from 'lib/utils';
import type { SettingsEditorMigrationModalProps } from './types';
import styles from './SettingsEditorMigrationModal.module.css';

export const SettingsEditorMigrationModal = (
  props: SettingsEditorMigrationModalProps,
) => {
  const { visible, onClose } = props;

  // References to textarea elements
  const exportRef = useRef<HTMLTextAreaElement>(null);
  const importRef = useRef<HTMLTextAreaElement>(null);

  // Retrieve data reload functions
  const { onReload: onReloadAnimalMarkers } = useAnimalMarkers();
  const { onReload: onReloadCustomMarkers } = useCustomMarkers();
  const { onReload: onReloadSettings } = useSettings();

  // Browser storage manager
  const storage = useStorage();

  // Retrieve application translator
  const translate = useTranslator();

  /**
   * Handle copying migration data to clipboard
   */
  const handleCopy = useCallback(async () => {
    // Ensure storage exists before continuing
    if (!exportRef.current) {
      return;
    }

    // Copy data to the clipboard
    const data = exportRef.current.value;
    const success = await setClipboardValue(data);

    if (success) {
      sendGoogleEvent('settings_migrate_copy');
      showNotification(translate('TOOLBOX:COPY_SUCCESS'), 'info');
    } else {
      showNotification(translate('TOOLBOX:COPY_ERROR'), 'error');
    }
  }, [translate]);

  /**
   * Handle writing migration data
   */
  const handlePaste = useCallback(async () => {
    // Ensure storage exists before continuing
    if (!storage || !importRef.current) {
      return;
    }

    try {
      // Ensure text exists on system clipboard
      const data = importRef.current.value;
      writeSerializedStorage(storage, data);

      // Reload custom animal data and settings to force the map to update
      onReloadAnimalMarkers();
      onReloadCustomMarkers();
      onReloadSettings();

      // Send tracking event, show notification and close the modal
      sendGoogleEvent('settings_migrate_paste');
      showNotification(translate('TOOLBOX:MIGRATION_IMPORT_SUCCESS'), 'info');
      onClose();
    } catch (e) {
      showNotification(translate('TOOLBOX:MIGRATION_IMPORT_ERROR'), 'error');
    }
  }, [
    onClose,
    onReloadAnimalMarkers,
    onReloadCustomMarkers,
    onReloadSettings,
    storage,
    translate,
  ]);

  /**
   * Handle selecting all text when clicking inside
   */
  const handleSelectAll = useCallback(
    (event: MouseEvent<HTMLTextAreaElement>) => {
      event.currentTarget.focus();
      event.currentTarget.select();
    },
    [],
  );

  // Load migration data string
  useEffect(() => {
    // Ensure storage and textarea element exist before continuing
    if (!storage || !exportRef.current) {
      return;
    }

    exportRef.current.value = readSerializedStore(storage);
  }, [storage]);

  // Load migration data string
  useEffect(() => {
    // Ensure storage and textarea element exist before continuing
    if (!visible || !storage || !exportRef.current) {
      return;
    }

    try {
      exportRef.current.value = readSerializedStore(storage);
    } catch (e) {
      if (e instanceof Error) {
        exportRef.current.value = e.message;
      } else {
        exportRef.current.value = 'Unknown error';
      }
    }
  }, [storage, visible]);

  return createPortal(
    <Modal
      header={translate('TOOLBOX:DATA_MIGRATION')}
      visible={visible}
      onClose={onClose}
    >
      <div className={styles.SettingsEditorMigrationModal}>
        <div className={styles.SettingsEditorMigrationModalPanel}>
          <Textarea
            className={styles.SettingsEditorMigrationModalTextarea}
            readOnly
            ref={exportRef}
            rows={8}
            onClick={handleSelectAll}
          />
          <Button
            className={styles.SettingsEditorMigrationButtonCopy}
            onClick={handleCopy}
          >
            {translate('TOOLBOX:COPY')}
          </Button>
        </div>

        <div className={styles.SettingsEditorMigrationModalPanel}>
          <Textarea
            className={styles.SettingsEditorMigrationModalTextarea}
            ref={importRef}
            rows={8}
            onClick={handleSelectAll}
          />
          <Button
            className={styles.SettingsEditorMigrationButtonPaste}
            onClick={handlePaste}
          >
            {translate('UI:APPLY')}
          </Button>
        </div>
      </div>
    </Modal>,
    document.body ?? document.getElementById('layout-content'),
  );
};
