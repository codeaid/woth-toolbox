import type { EmphasisProps } from './types';
import styles from './Emphasis.module.css';

export const Emphasis = (props: EmphasisProps) => (
  <span {...props} className={styles.Emphasis} />
);
