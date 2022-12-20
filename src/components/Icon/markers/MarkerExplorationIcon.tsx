import classnames from 'classnames';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import MarkerExplorationSvg from './assets/MarkerExploration.svg';
import styles from './MarkerExplorationIcon.module.css';

export const MarkerExplorationIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, highlighted, ...rest } = props;

    // Generate vector icon's class name
    const vectorIconClass = useMemo(
      () =>
        classnames(
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
