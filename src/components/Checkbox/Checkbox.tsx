import classnames from 'classnames';
import { CheckboxProps } from './types';
import styles from './Checkbox.module.css';

export const Checkbox = (props: CheckboxProps) => (
  <div className={classnames(styles.Checkbox)}>
    <input {...props} className={styles.CheckboxInput} type="checkbox" />
    <div className={styles.CheckboxTick}></div>
  </div>
);
