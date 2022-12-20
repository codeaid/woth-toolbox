import classnames from 'classnames';
import { ChangeEvent, useCallback } from 'react';
import { Checkbox } from 'components/Checkbox';
import { HuntingMapFilterOptionProps } from './types';
import styles from './HuntingMapFilter.module.css';

export const HuntingMapFilterOption = (props: HuntingMapFilterOptionProps) => {
  const { checked, children, onChange } = props;

  /**
   * Handle changing checkbox value
   */
  const handleCheckboxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.checked),
    [onChange],
  );

  /**
   * Handle clicking on the filter item
   */
  const handleClick = useCallback(
    () => onChange(!checked),
    [checked, onChange],
  );

  return (
    <li
      className={classnames(styles.HuntingMapFilterMenuItem)}
      onClick={handleClick}
    >
      <span className={styles.HuntingMapFilterMenuItemLabel}>{children}</span>
      <div className={styles.HuntingMapFilterMenuOptionCheckbox}>
        <Checkbox checked={checked} onChange={handleCheckboxChange} />
      </div>
    </li>
  );
};
