import clsx from 'clsx';
import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useCallback,
  useMemo,
} from 'react';
import { TextareaProps } from './types';
import styles from './Textarea.module.css';

export const Textarea = forwardRef(
  (props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { className, ...rest } = props;

    // Generate component class names
    const classNames = useMemo(
      () => clsx(styles.Textarea, className),
      [className],
    );

    /**
     * Prevent key presses from bubbling up and creating markers on the maps
     */
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<EventTarget>) => event.stopPropagation(),
      [],
    );

    // noinspection XmlDeprecatedElement
    return (
      <textarea
        {...rest}
        className={classNames}
        ref={ref}
        onKeyDown={handleKeyDown}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
