import clsx from 'clsx';
import { useCallback } from 'react';
import type { ContextMenuOptionItemProps } from './types';
import styles from './ContextMenuOptionItem.module.css';

export const ContextMenuOptionItem = (props: ContextMenuOptionItemProps) => {
  const { option, onOptionClick } = props;

  // Extract option properties
  const { disabled, icon: IconComponent, label, separator, onClick } = option;

  /**
   * Handle clicks on the current option
   */
  const handleClick = useCallback(() => {
    // Ignore clicks if option is disabled
    if (disabled) {
      return;
    }

    // Trigger callbacks
    onClick();
    onOptionClick();
  }, [disabled, onClick, onOptionClick]);

  // Render separator component
  const renderedIcon = IconComponent ? <IconComponent /> : null;

  // Render separator component
  const renderedSeparator = separator ? (
    <li className={styles.ContextMenuOptionItemSeparator}>
      <hr />
    </li>
  ) : null;

  return (
    <>
      {renderedSeparator}
      <li
        className={clsx(styles.ContextMenuOptionItem, {
          [styles.ContextMenuOptionItemDisabled]: disabled,
        })}
        onClick={handleClick}
      >
        <div className={styles.ContextMenuOptionItemIcon}>{renderedIcon}</div>
        {label}
      </li>
    </>
  );
};
