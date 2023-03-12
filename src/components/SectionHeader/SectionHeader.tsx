import clsx from 'clsx';
import styles from './SectionHeader.module.css';
import { SectionHeaderProps } from './types';

export const SectionHeader = (props: SectionHeaderProps) => {
  const { children, className, ...rest } = props;

  return (
    <div className={clsx(styles.SectionHeader, className)} {...rest}>
      <div className={styles.SectionHeaderContent}>{children}</div>
    </div>
  );
};
