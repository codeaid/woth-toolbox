import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import MarkerExplorationSvg from './assets/MarkerExploration.svg';
import styles from './MarkerExplorationIcon.module.css';

export const MarkerExplorationIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, highlighted, ...rest } = props;

    // Generate vector icon's class name
    const vectorIconClass = useMemo(
      () =>
        clsx(
          styles.MarkerExploration,
          {
            [styles.MarkerExplorationColorless]: highlighted === false,
          },
          className,
        ),
      [className, highlighted],
    );

    return (
      <VectorIcon
        className={vectorIconClass}
        component={MarkerExplorationSvg}
        highlighted={highlighted}
        {...rest}
        ref={ref}
      />
    );
  },
);

MarkerExplorationIcon.displayName = 'MarkerExplorationIcon';
