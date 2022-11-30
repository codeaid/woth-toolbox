import classnames from 'classnames';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { TextareaProps } from './types';
import styles from './Textarea.module.css';

export const Textarea = forwardRef(
  (props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { className, ...rest } = props;

    // Generate component class names
    const classNames = useMemo(
      () => classnames(styles.Textarea, className),
      [className],
    );

    return <textarea {...rest} className={classNames} ref={ref} />;
  },
);

Textarea.displayName = 'Textarea';
