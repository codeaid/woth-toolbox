import { Spinner } from 'components/Spinner';
import { LoadingOverlayProps } from './types';
import styles from './LoadingOverlay.module.css';

export const LoadingOverlay = (props: LoadingOverlayProps) => {
  const { children } = props;

  return (
    <div className={styles.LoadingOverlay}>
      <Spinner />
      {children && (
        <div className={styles.LoadingOverlayContent}>{children}</div>
      )}
    </div>
  );
};
