import clsx from 'clsx';
import type { CheckboxProps } from './types';
import styles from './Checkbox.module.css';

export const Checkbox = (props: CheckboxProps) => (
  <div className={clsx(styles.Checkbox)}>
    <input {...props} className={styles.CheckboxInput} type="checkbox" />
    <div className={styles.CheckboxTick}></div>
  </div>
);
