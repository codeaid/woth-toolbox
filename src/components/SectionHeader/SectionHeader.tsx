import clsx from 'clsx';
import type { SectionHeaderProps } from './types';
import styles from './SectionHeader.module.css';

export const SectionHeader = (props: SectionHeaderProps) => {
  const { children, className, ...rest } = props;

  return (
    <div className={clsx(styles.SectionHeader, className)} {...rest}>
      <div className={styles.SectionHeaderContent}>{children}</div>
    </div>
  );
};
