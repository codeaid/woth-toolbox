import { NavLink, NavLinkProps } from 'components/NavLink';
import styles from './ToolbarAction.module.css';

export const ToolbarAction = (props: NavLinkProps) => (
  <NavLink
    {...props}
    activeClassName={styles.ToolbarActionActive}
    className={styles.ToolbarAction}
  />
);
