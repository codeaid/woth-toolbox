import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import PhotoSvg from './assets/Photo.svg';

export const PhotoIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={PhotoSvg} {...props} ref={ref} />
  ),
);

PhotoIcon.displayName = 'PhotoIcon';
