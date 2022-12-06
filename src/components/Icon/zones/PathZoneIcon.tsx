import { ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import { IconProps } from '../types';
import PathZoneImage from './assets/PathZone.png';

export const PathZoneIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={PathZoneImage.src} {...props} ref={ref} />
  ),
);

PathZoneIcon.displayName = 'PathZoneIcon';
