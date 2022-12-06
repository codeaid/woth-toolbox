import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import PhotoSvg from './assets/Photo.svg';

export const PhotoIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={PhotoSvg} {...props} ref={ref} />
  ),
);

PhotoIcon.displayName = 'PhotoIcon';
