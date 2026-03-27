'use client';

import { useCallback, useEffect, useState } from 'react';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import styles from './DeprecationNotice.module.css';

const cookieName = 'woth_notice_dismissed';
const cookieMaxAge = 86400 * 7; // 7 days in seconds

const isCookieSet = () =>
  document.cookie.split('; ').some(c => c.startsWith(`${cookieName}=`));

const setCookie = () => {
  document.cookie = `${cookieName}=1; max-age=${cookieMaxAge}; path=/; SameSite=Lax`;
};

export const DeprecationNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isCookieSet()) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = useCallback(() => {
    setCookie();
    setVisible(false);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.DeprecationNoticeBackdrop}>
      <div className={styles.DeprecationNoticeModal}>
        <div className={styles.DeprecationNoticeTitle}>
          <BsFillExclamationTriangleFill
            className={styles.DeprecationNoticeTitleIcon}
          />
          TOOLBOX HAS MOVED
        </div>

        <div className={styles.DeprecationNoticeBody}>
          <span>
            This application is no longer supported and will be{' '}
            <span className={styles.DeprecationNoticeHighlight}>shut down</span>{' '}
            in June 2026.
          </span>
          <span>
            The new toolbox at{' '}
            <strong className={styles.DeprecationNoticeUrl}>
              toolbox.byteset.io
            </strong>{' '}
            includes:
          </span>
        </div>

        <div className={styles.DeprecationNoticeBenefits}>
          <div className={styles.DeprecationNoticeBenefit}>
            All maps, including the latest{' '}
            <span className={styles.DeprecationNoticeHighlight}>Elkcrest</span>
          </div>
          <div className={styles.DeprecationNoticeBenefit}>
            <span className={styles.DeprecationNoticeHighlight}>
              Ammunition
            </span>{' '}
            information and ballistics data
          </div>
          <div className={styles.DeprecationNoticeBenefit}>
            <span className={styles.DeprecationNoticeHighlight}>
              Up-to-date
            </span>{' '}
            animal markers &amp; need zones
          </div>
          <div className={styles.DeprecationNoticeBenefit}>
            <span className={styles.DeprecationNoticeHighlight}>
              Cloud storage
            </span>{' '}
            for your customizations
          </div>
          <div className={styles.DeprecationNoticeBenefit}>
            <span className={styles.DeprecationNoticeHighlight}>3D maps</span>{' '}
            and countless other features
          </div>
        </div>

        <div className={styles.DeprecationNoticeActions}>
          <button
            className={styles.DeprecationNoticeSecondary}
            type="button"
            onClick={handleDismiss}
          >
            Maybe Later
          </button>
          <a
            className={styles.DeprecationNoticePrimary}
            href="https://toolbox.byteset.io"
            rel="noopener noreferrer"
          >
            Open New Toolbox
          </a>
        </div>
      </div>
    </div>
  );
};
