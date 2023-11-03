import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';
import type { ForwardedRef } from 'react';
import { Icon } from './Icon';
import type { VectorIconProps } from './types';
import styles from './VectorIcon.module.css';

export const VectorIcon = forwardRef(
  (props: VectorIconProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      className,
      component: Component,
      highlighted = false,
      size,
      ...rest
    } = props;

    // Generate icon's class name
    const vectorIconClass = useMemo(
      () =>
        clsx(
          styles.VectorIcon,
          {
            [styles.VectorIconHighlighted]: highlighted,
          },
          className,
        ),
      [className, highlighted],
    );

    return (
      <Icon className={vectorIconClass} size={size} {...rest} ref={ref}>
        <Component
          className={styles.VectorIconComponent}
          height={size}
          width={size}
        />
      </Icon>
    );
  },
);

VectorIcon.displayName = 'VectorIcon';
