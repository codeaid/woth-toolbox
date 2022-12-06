import { ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import { IconProps } from '../types';
import GatherZoneImage from './assets/GatherZone.png';

export const GatherZoneIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={GatherZoneImage.src} {...props} ref={ref} />
  ),
);

GatherZoneIcon.displayName = 'GatherZoneIcon';
