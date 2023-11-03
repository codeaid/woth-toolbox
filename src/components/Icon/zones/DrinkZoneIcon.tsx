import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import type { IconProps } from '../types';
import DrinkZoneImage from './assets/DrinkZone.png';

export const DrinkZoneIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={DrinkZoneImage.src} {...props} ref={ref} />
  ),
);

DrinkZoneIcon.displayName = 'DrinkZoneIcon';
