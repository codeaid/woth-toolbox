import classnames from 'classnames';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { ButtonProps } from './types';
import styles from './Button.module.css';

export const Button = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { className, ...rest } = props;

    // Generate component class names
    const classNames = useMemo(
      () => classnames(styles.Button, className),
      [className],
    );

    return <button {...rest} className={classNames} ref={ref} />;
  },
);

Button.displayName = 'Button';
