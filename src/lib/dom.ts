import type { Reference } from 'types/dom';

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
