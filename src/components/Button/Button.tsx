import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';
import type { ForwardedRef } from 'react';
import type { ButtonProps } from './types';
import styles from './Button.module.css';

export const Button = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { children, className, tabIndex = -1, ...rest } = props;

    // Generate component class names
    const classNames = useMemo(
      () => clsx(styles.Button, className),
      [className],
    );

    return (
      <button {...rest} className={classNames} ref={ref} tabIndex={tabIndex}>
        <div className={styles.ButtonContent}>{children}</div>
      </button>
    );
  },
);

Button.displayName = 'Button';
