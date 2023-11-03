import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import type { IconProps } from '../types';
import PathZoneImage from './assets/PathZone.png';

export const PathZoneIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={PathZoneImage.src} {...props} ref={ref} />
  ),
);

PathZoneIcon.displayName = 'PathZoneIcon';
