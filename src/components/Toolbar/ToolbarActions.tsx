import { PropsWithChildren } from 'react';
import styles from './ToolbarActions.module.css';

export const ToolbarActions = (props: PropsWithChildren) => {
  const { children } = props;

  return <div className={styles.ToolbarActions}>{children}</div>;
};
