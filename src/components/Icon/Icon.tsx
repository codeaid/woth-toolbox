import classnames from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  TouchEvent,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { IconComponentProps } from './types';
import styles from './Icon.module.css';

export const Icon = forwardRef(
  (props: IconComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      children,
      className,
      longPressMs = 500,
      size = 40,
      style,
      title,
      onClick,
      onLongPress,
    } = props;

    // Long press timeout handle
    const longPressHandle = useRef<NodeJS.Timeout>();

    // Generate component class name
    const iconClassName = useMemo(
      () => classnames(styles.Icon, className),
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
        title={title}
        onClick={onClick}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchEnd}
        onTouchStart={handleTouchStart}
      >
        {children}
      </div>
    );
  },
);

Icon.displayName = 'Icon';
