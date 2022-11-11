import { PropsWithChildren } from 'react';
import styles from './SectionHeader.module.css';

export const SectionHeader = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div className={styles.SectionHeader}>
      <div className={styles.SectionHeaderContent}>{children}</div>
    </div>
  );
};
