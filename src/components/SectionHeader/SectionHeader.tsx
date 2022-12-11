import classnames from 'classnames';
import styles from './SectionHeader.module.css';
import { SectionHeaderProps } from './types';

export const SectionHeader = (props: SectionHeaderProps) => {
  const { children, className, ...rest } = props;

  return (
    <div className={classnames(styles.SectionHeader, className)} {...rest}>
      <div className={styles.SectionHeaderContent}>{children}</div>
    </div>
  );
};
