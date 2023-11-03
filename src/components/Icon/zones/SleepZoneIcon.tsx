import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import type { IconProps } from '../types';
import SleepZoneImage from './assets/SleepZone.png';

export const SleepZoneIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={SleepZoneImage.src} {...props} ref={ref} />
  ),
);

SleepZoneIcon.displayName = 'SleepZoneIcon';
