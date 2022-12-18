import { ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import { IconProps } from '../types';
import MarkerTrackingImage from './assets/MarkerTracking.png';

export const MarkerTrackingIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={MarkerTrackingImage.src} {...props} ref={ref} />
  ),
);

MarkerTrackingIcon.displayName = 'MarkerTrackingIcon';
