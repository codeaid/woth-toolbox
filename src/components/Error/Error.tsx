import type { ErrorProps } from './types';
import styles from './Error.module.css';

export const Error = (props: ErrorProps) => {
  const { status } = props;

  return (
    <div className={styles.Error}>
      <h1 className={styles.ErrorHeading}>{status}</h1>
    </div>
  );
};
