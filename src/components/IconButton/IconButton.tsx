import classnames from 'classnames';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { IconButtonProps } from './types';
import styles from './IconButton.module.css';

export const IconButton = forwardRef(
  (props: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { className, highlighted = false, ...rest } = props;

    // Generate component class names
    const classNames = useMemo(
      () =>
        classnames(
          styles.IconButton,
          {
            [styles.IconButtonHighlighted]: highlighted,
          },
          className,
        ),
      [className, highlighted],
    );

    return <button {...rest} className={classNames} ref={ref} />;
  },
);

IconButton.displayName = 'IconButton';
