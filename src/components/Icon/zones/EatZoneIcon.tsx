import { ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import { IconProps } from '../types';
import EatZoneImage from './assets/EatZone.png';

export const EatZoneIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={EatZoneImage.src} {...props} ref={ref} />
  ),
);

EatZoneIcon.displayName = 'EatZoneIcon';
