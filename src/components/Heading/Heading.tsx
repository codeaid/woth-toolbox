import clsx from 'clsx';
import { useMemo } from 'react';
import type { HeadingProps } from './types';
import styles from './Heading.module.css';

export const Heading = (props: HeadingProps) => {
  const { children, className, size, ...rest } = props;

  // Generate component class names
  const classNames = useMemo(
    () =>
      clsx(
        styles.Heading,
        {
          [styles.Heading1]: size === 1,
          [styles.Heading2]: size === 2,
          [styles.Heading3]: size === 3,
          [styles.Heading4]: size === 4,
          [styles.Heading5]: size === 5,
          [styles.Heading6]: size === 6,
        },
        className,
      ),
    [className, size],
  );

  return useMemo(() => {
    switch (size) {
      case 1:
        return (
          <h1 {...rest} className={classNames}>
            {children}
          </h1>
        );
      case 2:
        return (
          <h2 {...rest} className={classNames}>
            {children}
          </h2>
        );
      case 3:
        return (
          <h3 {...rest} className={classNames}>
            {children}
          </h3>
        );
      case 4:
        return (
          <h4 {...rest} className={classNames}>
            {children}
          </h4>
        );
      case 5:
        return (
          <h5 {...rest} className={classNames}>
            {children}
          </h5>
        );
      case 6:
        return (
          <h6 {...rest} className={classNames}>
            {children}
          </h6>
        );
    }
  }, [children, classNames, rest, size]);
};
