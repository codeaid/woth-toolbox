import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { getIconComponent } from 'lib/icons';
import type { HuntingMapFilterItemProps } from './types';
import styles from './HuntingMapFilter.module.css';

export const HuntingMapFilterItem = (props: HuntingMapFilterItemProps) => {
  const { children, iconSize, selected, type, onChange } = props;

  // Retrieve icon component associated with current filter item
  const IconComponent = useMemo(() => getIconComponent(type), [type]);

  /**
   * Handle clicking on the filter item
   */
  const handleClick = useCallback(
    () => onChange(!selected, type),
    [onChange, selected, type],
  );

  return (
    <li
      className={clsx(styles.HuntingMapFilterMenuItem, {
        [styles.HuntingMapFilterMenuItemEnabled]: selected,
      })}
      onClick={handleClick}
    >
      <span className={styles.HuntingMapFilterMenuItemLabel} title={children}>
        {children}
      </span>
      <div className={styles.HuntingMapFilterMenuItemIcon}>
        <IconComponent highlighted={selected} size={iconSize} />
      </div>
    </li>
  );
};
