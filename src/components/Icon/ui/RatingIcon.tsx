import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import RatingSvg from './assets/Rating.svg';

export const RatingIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RatingSvg} {...props} ref={ref} />
  ),
);

RatingIcon.displayName = 'RatingIcon';
