import classnames from 'classnames';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { ButtonProps } from './types';
import styles from './Button.module.css';

export const Button = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { children, className, tabIndex = -1, ...rest } = props;

    // Generate component class names
    const classNames = useMemo(
      () => classnames(styles.Button, className),
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
