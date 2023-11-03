import type { MutableRefObject, RefCallback } from 'react';
import type {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  UNMOUNTED,
} from 'react-transition-group/Transition';

// Reference type combining Ref<T> types of objects as well as reference callbacks
export type Reference<TValue> = Maybe<
  MutableRefObject<Nullable<TValue>> | RefCallback<TValue>
>;

export type TransitionEntering = typeof ENTERING;
export type TransitionEntered = typeof ENTERED;
export type TransitionExiting = typeof EXITING;
export type TransitionExited = typeof EXITED;
export type TransitionUnmounted = typeof UNMOUNTED;

export type TransitionState =
  | TransitionEntering
  | TransitionEntered
  | TransitionExiting
  | TransitionExited
  | TransitionUnmounted;
