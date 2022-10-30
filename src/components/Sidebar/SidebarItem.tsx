import classnames from 'classnames';
import { useCallback } from 'react';
import styles from './SidebarItem.module.css';
import { SidebarItemProps } from './types';

export const SidebarItem = (props: SidebarItemProps) => {
  const { active = false, animal, onClick } = props;

  /**
   * Handle clicks on the current item
   */
  const handleClick = useCallback(() => onClick(animal), [animal, onClick]);

  return (
    <li
      className={classnames({
        [styles.SidebarItem]: true,
        [styles.SidebarItemActive]: active,
      })}
      onClick={handleClick}
    >
      <div className={styles.SidebarItemContainer}>
        <div className={styles.SidebarItemTitle}>{animal.name}</div>
        <div className={styles.SidebarItemSubtitle}>
          {animal.latin || 'Unknown'}
        </div>
      </div>
    </li>
  );
};
