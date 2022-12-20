import classnames from 'classnames';
import { useCallback, useMemo } from 'react';
import { getIconComponent } from 'lib/icons';
import { HuntingMapFilterItemProps } from './types';
import styles from './HuntingMapFilter.module.css';

export const HuntingMapFilterItem = (props: HuntingMapFilterItemProps) => {
  const { children, large = false, selected, type, onChange } = props;

  // Retrieve icon component associated with current filter item
  const IconComponent = useMemo(() => getIconComponent(type), [type]);

  /**
   * Handle clicking on the filter item
   */
  const handleClick = useCallback(() => {
    onChange(type, !selected);
  }, [onChange, selected, type]);

  return (
    <li
      className={classnames(styles.HuntingMapFilterMenuItem, {
        [styles.HuntingMapFilterMenuItemEnabled]: selected,
      })}
      onClick={handleClick}
    >
      <span className={styles.HuntingMapFilterMenuItemLabel}>{children}</span>
      <IconComponent highlighted={selected} size={large ? 38 : 28} />
    </li>
  );
};
