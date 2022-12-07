import { useCallback, useMemo } from 'react';
import { RiCloseFill, RiDeleteBin6Line } from 'react-icons/ri';
import { getIconComponent } from 'lib/icons';
import { DebugPanelIconRowProps } from './types';
import styles from './DebugPanelIconRow.module.css';

export const DebugPanelIconRow = (props: DebugPanelIconRowProps) => {
  const {
    caption,
    completedCount,
    disabled,
    iconType,
    totalCount,
    onZoneRemove,
  } = props;

  // Icon component to use when rendering need zone icons
  const IconComponent = useMemo(() => getIconComponent(iconType), [iconType]);

  /**
   * Render individual need zone icons
   *
   * @param index Index of the icon in the list
   */
  const renderIcon = useCallback(
    (index: number) => {
      // Render completed icons
      if (index < completedCount) {
        return (
          <>
            <IconComponent size={24} />
            {!disabled ? (
              <div
                className={styles.DebugPanelIconRowIconAction}
                onClick={() => onZoneRemove(index)}
              >
                <RiDeleteBin6Line />
              </div>
            ) : null}
          </>
        );
      }

      // Render pending icons
      if (index < totalCount) {
        return (
          <IconComponent
            className={styles.DebugPanelIconRowIconPending}
            size={24}
          />
        );
      }

      // Render placeholders for inapplicable zone icons
      return (
        <RiCloseFill className={styles.DebugPanelIconRowIconPlaceholder} />
      );
    },
    [IconComponent, completedCount, disabled, onZoneRemove, totalCount],
  );

  // Render icons to be displayed
  const renderedIcons = useMemo(
    () =>
      [...Array(6)].map((value, index) => (
        <div className={styles.DebugPanelIconRowIcon} key={index}>
          {renderIcon(index)}
        </div>
      )),
    [renderIcon],
  );

  return (
    <div className={styles.DebugPanelIconRow}>
      <div className={styles.DebugPanelIconRowCaption}>{caption}</div>
      <div className={styles.DebugPanelIconRowIcons}>{renderedIcons}</div>
    </div>
  );
};
