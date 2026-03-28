'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useStorage } from 'hooks';
import { setClipboardValue } from 'lib/clipboard';
import { storageSerializeAsync } from 'lib/storage';
import styles from './page.module.css';

const allowedOrigins = [
  'https://toolbox.byteset.io',
  'http://localhost:5173',
  'http://localhost:4173',
];

type Mode = 'unknown' | 'popup' | 'standalone';

type MigrateStatus =
  | 'loading'
  | 'no-data'
  | 'ready'
  | 'transferring'
  | 'transferred'
  | 'error';

const MigratePage = () => {
  const storage = useStorage();
  const [mode, setMode] = useState<Mode>('unknown');
  const [status, setStatus] = useState<MigrateStatus>('loading');
  const [copied, setCopied] = useState(false);
  const dataRef = useRef<string>('');
  const openerOriginRef = useRef<string>('');

  // Detect mode on mount (runs once, before data loading)
  useEffect(() => {
    if (window.opener) {
      setMode('popup');

      // Determine opener origin by trying allowed origins
      // The opener's actual origin is not directly readable cross-origin,
      // so we accept postMessage acks from any allowed origin
      openerOriginRef.current = allowedOrigins[0];
    } else {
      setMode('standalone');
    }
  }, []);

  const handleTransfer = useCallback((data: string) => {
    if (!window.opener) {
      return;
    }

    try {
      setStatus('transferring');

      // Send to all allowed origins — only the matching one will receive it
      for (const origin of allowedOrigins) {
        window.opener.postMessage(
          { type: 'woth-migration-data', data },
          origin,
        );
      }
    } catch {
      setStatus('error');
    }
  }, []);

  // Serialize data when storage is available and mode is determined
  useEffect(() => {
    if (!storage || mode === 'unknown') {
      return;
    }

    storageSerializeAsync(storage).then(value => {
      if (!value || value.length === 0) {
        setStatus('no-data');
        return;
      }

      dataRef.current = value;

      if (mode === 'popup') {
        handleTransfer(value);
      } else {
        setStatus('ready');
      }
    });
  }, [handleTransfer, mode, storage]);

  // Listen for acknowledgment from the new app
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!allowedOrigins.includes(event.origin)) {
        return;
      }

      if (event.data?.type === 'woth-migration-ack') {
        setStatus('transferred');
        setTimeout(() => {
          window.close();
        }, 1500);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleCopy = useCallback(async () => {
    const success = await setClipboardValue(dataRef.current);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  // Centered layout for loading state and popup mode
  if (mode === 'unknown' || mode === 'popup' || status === 'loading') {
    return (
      <div className={styles.page}>
        <div className={styles.popup}>
          <div className={styles.branding}>Way of the Hunter Toolbox</div>

          {(status === 'loading' || mode === 'unknown') && (
            <>
              <div className={styles.spinner} />
              <div className={styles.title}>Reading your data...</div>
            </>
          )}

          {status === 'transferring' && (
            <>
              <div className={styles.spinner} />
              <div className={styles.title}>Transferring your data...</div>
              <div className={styles.subtitle}>
                This window will close automatically
              </div>
            </>
          )}

          {status === 'transferred' && (
            <>
              <div className={styles.checkmark}>&#10003;</div>
              <div className={styles.title}>Transfer complete!</div>
              <div className={styles.subtitle}>Closing this window...</div>
            </>
          )}

          {status === 'no-data' && (
            <>
              <div className={styles.title}>No data found</div>
              <div className={styles.subtitle}>
                There is no saved data in this browser to transfer.
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className={styles.title}>Transfer failed</div>
              <div className={styles.subtitle}>
                Please close this window and use the manual paste option
                instead.
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Standalone mode UI
  return (
    <div className={styles.page}>
      <div className={styles.standalone}>
        <div className={styles.branding}>Way of the Hunter Toolbox</div>

        <h1 className={styles.heading}>Migrate Your Data</h1>

        {status === 'no-data' && (
          <div className={styles.noData}>
            <p>There is no saved data in this browser to migrate.</p>
            <p>
              If you used a different browser, please open this page in that
              browser instead.
            </p>
          </div>
        )}

        {status === 'ready' && (
          <>
            <p className={styles.instructions}>
              Copy the code below and paste it into the new toolbox at{' '}
              <a
                className={styles.link}
                href={`${allowedOrigins[0]}/import`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {allowedOrigins[0].replace('https://', '')}/import
              </a>
            </p>

            <div className={styles.codeBlock}>
              <code className={styles.code}>{dataRef.current}</code>
            </div>

            <button className={styles.copyButton} onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy Migration Code'}
            </button>
          </>
        )}

        {status === 'error' && (
          <div className={styles.noData}>
            <p>Something went wrong while reading your data.</p>
            <p>Please try refreshing the page.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MigratePage;
