import { PropsWithChildren } from 'react';
import styles from './ToolbarTitle.module.css';

export const ToolbarTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return <div className={styles.ToolbarTitle}>{children}</div>;
};
