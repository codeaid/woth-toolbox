import { ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import { IconProps } from '../types';
import AnimalAgeImage from './assets/AnimalAge.png';

export const AnimalAgeIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={AnimalAgeImage.src} {...props} ref={ref} />
  ),
);

AnimalAgeIcon.displayName = 'AnimalAgeIcon';
