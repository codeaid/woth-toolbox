import classnames from 'classnames';
import {
  ForwardedRef,
  KeyboardEvent,
  forwardRef,
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
      () => classnames(styles.Textarea, className),
      [className],
    );

    /**
     * Prevent key presses from bubbling up
     */
    const handleKeyPress = useCallback(
      (event: KeyboardEvent<EventTarget>) => event.stopPropagation(),
      [],
    );

    return (
      <textarea
        {...rest}
        className={classNames}
        ref={ref}
        onKeyPress={handleKeyPress}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
