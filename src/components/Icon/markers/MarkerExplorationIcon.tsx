import classnames from 'classnames';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import MarkerExplorationSvg from './assets/MarkerExploration.svg';
import styles from './MarkerExplorationIcon.module.css';

export const MarkerExplorationIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, ...rest } = props;

    // Generate vector icon's class name
    const vectorIconClass = useMemo(
      () => classnames(styles.MarkerExploration, className),
      [className],
    );

    return (
      <VectorIcon
        className={vectorIconClass}
        component={MarkerExplorationSvg}
        {...rest}
        ref={ref}
      />
    );
  },
);

MarkerExplorationIcon.displayName = 'MarkerExplorationIcon';
