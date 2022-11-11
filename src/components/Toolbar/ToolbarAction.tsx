import { ActiveLink, ActiveLinkProps } from 'components/ActiveLink';
import styles from './ToolbarAction.module.css';

export const ToolbarAction = (props: ActiveLinkProps) => (
  <ActiveLink
    {...props}
    activeClassName={styles.ToolbarActionActive}
    className={styles.ToolbarAction}
  />
);
