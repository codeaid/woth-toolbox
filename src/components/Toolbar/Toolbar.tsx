import { PropsWithChildren } from 'react';
import styles from './Toolbar.module.css';

export const Toolbar = (props: PropsWithChildren) => {
  const { children } = props;

  return <div className={styles.Toolbar}>{children}</div>;
};
