import { MutableRefObject, RefCallback } from 'react';

// Reference type combining Ref<T> types of objects as well as reference callbacks
export type Reference<TValue> = Maybe<
  MutableRefObject<Nullable<TValue>> | RefCallback<TValue>
>;
