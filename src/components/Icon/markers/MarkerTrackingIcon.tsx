import classnames from 'classnames';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import MarkerTrackingSvg from './assets/MarkerTracking.svg';
import styles from './MarkerTrackingIcon.module.css';

export const MarkerTrackingIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, ...rest } = props;

    // Generate vector icon's class name
    const vectorIconClass = useMemo(
      () => classnames(styles.MarkerTracking, className),
      [className],
    );

    return (
      <VectorIcon
        className={vectorIconClass}
        component={MarkerTrackingSvg}
        {...rest}
        ref={ref}
      />
    );
  },
);

MarkerTrackingIcon.displayName = 'MarkerTrackingIcon';
