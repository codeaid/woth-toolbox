import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';
import type { ForwardedRef } from 'react';
import { Button } from 'components/Button';
import type { IconButtonProps } from './types';
import styles from './IconButton.module.css';

export const IconButton = forwardRef(
  (props: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { className, highlighted = false, ...rest } = props;

    // Generate component class names
    const classNames = useMemo(
      () =>
        clsx(
          styles.IconButton,
          {
            [styles.IconButtonHighlighted]: highlighted,
          },
          className,
        ),
      [className, highlighted],
    );

    return <Button {...rest} className={classNames} ref={ref} />;
  },
);

IconButton.displayName = 'IconButton';
