import clsx from 'clsx';
import type { TransitionState } from 'types/dom';
import type { Reference } from 'types/dom';

/**
 * Generate CSS classname for the specified transition state
 *
 * @param state Source transition state
 * @param classEntering CSS class name for entering state
 * @param classEntered CSS class name for entered state
 * @param classExiting CSS class name for exiting state
 * @param classExited CSS class name for exited state
 * @param prepend List of class names to prepend
 * @param append List of class names to append
 */
export const getTransitionClassName = (
  state: TransitionState,
  classEntering: string,
  classEntered: string,
  classExiting: string,
  classExited: string,
  prepend: Array<string> = [],
  append: Array<string> = [],
) =>
  clsx(
    ...prepend,
    {
      [classEntering]: state === 'entering',
      [classEntered]: state === 'entered',
      [classExiting]: state === 'exiting',
      [classExited]: state === 'exited',
    },
    ...append,
  );

/**
 * Update value of the specified reference instance
 *
 * @param ref Target reference
 * @param value Value to update the reference with
 */
export const setReferenceValue = <TValue>(
  ref: Reference<TValue>,
  value: TValue,
) => {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
  } else {
    ref.current = value;
  }
};
