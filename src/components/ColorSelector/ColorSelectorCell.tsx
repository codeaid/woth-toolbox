import clsx from 'clsx';
import { useMemo } from 'react';
import type { ColorSelectorCellProps } from './types';
import styles from './ColorSelectorCell.module.css';

export const ColorSelectorCell = (props: ColorSelectorCellProps) => {
  const { color, value, onChange } = props;

  // Generate class name for the individual cell
  const className = useMemo(
    () =>
      clsx(styles.ColorSelectorCell, {
        [styles.ColorSelectorCellActive]: color === value,
      }),
    [color, value],
  );

  /**
   * Handle selecting the current color
   */
  const handleChange = () => onChange(value);

  return (
    <div
      className={className}
      style={{ backgroundColor: value }}
      onClick={handleChange}
    ></div>
  );
};
