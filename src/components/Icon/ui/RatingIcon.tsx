import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import RatingSvg from './assets/Rating.svg';

export const RatingIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RatingSvg} {...props} ref={ref} />
  ),
);

RatingIcon.displayName = 'RatingIcon';
