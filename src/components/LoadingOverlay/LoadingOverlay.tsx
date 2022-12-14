import { Spinner } from 'components/Spinner';
import styles from './LoadingOverlay.module.css';

export const LoadingOverlay = () => (
  <div className={styles.LoadingOverlay}>
    <Spinner />{' '}
  </div>
);
