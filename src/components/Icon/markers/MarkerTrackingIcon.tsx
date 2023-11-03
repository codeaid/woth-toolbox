import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import MarkerTrackingSvg from './assets/MarkerTracking.svg';
import styles from './MarkerTrackingIcon.module.css';

export const MarkerTrackingIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, highlighted, ...rest } = props;

    // Generate vector icon's class name
    const vectorIconClass = useMemo(
      () =>
        clsx(
          styles.MarkerTracking,
          {
            [styles.MarkerTrackingColorless]: highlighted === false,
          },
          className,
        ),
      [className, highlighted],
    );

    return (
      <VectorIcon
        className={vectorIconClass}
        component={MarkerTrackingSvg}
        highlighted={highlighted}
        {...rest}
        ref={ref}
      />
    );
  },
);

MarkerTrackingIcon.displayName = 'MarkerTrackingIcon';
