import { ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import { IconProps } from '../types';
import DrinkZoneImage from './assets/DrinkZone.png';

export const DrinkZoneIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={DrinkZoneImage.src} {...props} ref={ref} />
  ),
);

DrinkZoneIcon.displayName = 'DrinkZoneIcon';
