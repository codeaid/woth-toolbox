import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { RiArrowRightLine } from 'react-icons/ri';
import styles from './DeprecationBanner.module.css';

export const DeprecationBanner = () => (
  <a
    className={styles.DeprecationBanner}
    href="https://toolbox.byteset.io"
    rel="noopener noreferrer"
    target="_blank"
  >
    <BsFillExclamationTriangleFill className={styles.DeprecationBannerIcon} />

    <div className={styles.DeprecationBannerContent}>
      <span className={styles.DeprecationBannerText}>
        This application is no longer supported!
      </span>

      <div className={styles.DeprecationBannerLink}>
        Switch to the new version{' '}
        <RiArrowRightLine className={styles.DeprecationBannerLinkIcon} />
      </div>
    </div>
  </a>
);
