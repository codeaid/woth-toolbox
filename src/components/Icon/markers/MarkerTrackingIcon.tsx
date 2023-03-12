import clsx from 'clsx';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
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
