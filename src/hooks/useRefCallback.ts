import { useEffect, useState } from 'react';
import type { RefCallback } from 'react';
import { setReferenceValue } from 'lib/dom';
import type { Reference } from 'types/dom';

/**
 * Accept a list of references (both functional and object) and return the current reference
 * value and its setter function
 *
 * @param refs Target references to update when the value changes
 */
export const useRefCallback = <TValue>(...refs: Array<Reference<TValue>>) => {
  const [value, setValue] = useState<Nullable<TValue>>(null);

  useEffect(() => {
    // Iterate through all references and update their values to the latest value
    refs.forEach(ref => {
      setReferenceValue(ref, value);
    });

    return () => {
      // Iterate through all references and unset their values on unmount
      refs.forEach(ref => setReferenceValue(ref, null));
    };
  }, [refs, value]);

  return [value, setValue] as [Nullable<TValue>, RefCallback<TValue>];
};
