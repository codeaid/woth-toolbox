import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Button } from 'components/Button';
import { useStorage, useTranslator } from 'hooks';
import { copyTextToClipboard, getTextFromClipboard } from 'lib/debug';
import { readSerializeStore, writeSerializedStore } from 'lib/storage';
import styles from './SettingsEditorMigration.module.css';

export const SettingsEditorMigration = () => {
  // Retrieve application router
  const router = useRouter();

  // Browser storage manager
  const storage = useStorage();

  // Retrieve application translator
  const translate = useTranslator();

  /**
   * Handle reading migration data
   */
  const handleCopy = useCallback(async () => {
    // Ensure storage exists before continuing
    if (!storage) {
      return;
    }

    const data = readSerializeStore(storage);
    await copyTextToClipboard(data);
  }, [storage]);

  /**
   * Handle writing migration data
   */
  const handlePaste = useCallback(async () => {
    // Ensure storage exists before continuing
    if (!storage) {
      return;
    }

    // Ensure text exists on system clipboard
    const value = await getTextFromClipboard();
    if (!value) {
      return;
    }

    writeSerializedStore(storage, value);
    router.reload();
  }, [router, storage]);

  return (
    <div className={styles.SettingsEditorMigration}>
      <Button
        className={styles.SettingsEditorMigrationCopy}
        disabled={!storage}
        onClick={handleCopy}
      >
        {translate('TOOLBOX:COPY')}
      </Button>
      <Button
        className={styles.SettingsEditorMigrationPaste}
        onClick={handlePaste}
      >
        {translate('TOOLBOX:PASTE')}
      </Button>
    </div>
  );
};
