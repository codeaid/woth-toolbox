import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef, useMemo } from 'react';
import type { TextareaProps } from './types';
import styles from './Textarea.module.css';

export const Textarea = forwardRef(
  (props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { className, ...rest } = props;

    // Generate component class names
    const classNames = useMemo(
      () => clsx(styles.Textarea, className),
      [className],
    );

    // noinspection XmlDeprecatedElement
    return <textarea {...rest} className={classNames} ref={ref} />;
  },
);

Textarea.displayName = 'Textarea';
