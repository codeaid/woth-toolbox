import clsx from 'clsx';
import { forwardRef, useCallback, useMemo, useRef } from 'react';
import type { ForwardedRef, TouchEvent } from 'react';
import type { IconComponentProps } from './types';
import styles from './Icon.module.css';

export const Icon = forwardRef(
  (props: IconComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      children,
      className,
      highlighted,
      longPressMs = 500,
      size = 40,
      style,
      onClick,
      onLongPress,
      ...rest
    } = props;

    // Long press timeout handle
    const longPressHandle = useRef<NodeJS.Timeout>();

    // Generate component class name
    const iconClassName = useMemo(
      () => clsx(styles.Icon, className),
      [className],
    );

    /**
     * Cancel long press timer if set
     */
    const handleTouchEnd = useCallback(
      () => clearTimeout(longPressHandle.current),
      [],
    );

    /**
     * Start timer to detect long presses on the icon
     */
    const handleTouchStart = useCallback(
      (event: TouchEvent<EventTarget>) => {
        if (!onLongPress) {
          return;
        }

        longPressHandle.current = setTimeout(
          () => onLongPress(event),
          longPressMs,
        );
      },
      [longPressMs, onLongPress],
    );

    return (
      <div
        className={iconClassName}
        ref={ref}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          ...style,
        }}
        onClick={onClick}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchEnd}
        onTouchStart={handleTouchStart}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Icon.displayName = 'Icon';
