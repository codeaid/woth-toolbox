import { PropsWithChildren } from 'react';
import styles from './Sidebar.module.css';

export const Sidebar = (props: PropsWithChildren) => {
  const { children } = props;

  return <div className={styles.Sidebar}>{children}</div>;
};
