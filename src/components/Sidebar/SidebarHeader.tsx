import styles from './SidebarHeader.module.css';
import { SidebarHeaderProps } from './types';

export const SidebarHeader = (props: SidebarHeaderProps) => {
  const { tier } = props;

  return (
    <div className={styles.SidebarHeader}>
      <div className={styles.SidebarHeaderText}>{`TIER ${tier}`}</div>
    </div>
  );
};
