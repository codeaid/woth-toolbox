import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import type { IconProps } from '../types';
import AnimalAgeImage from './assets/AnimalAge.png';

export const AnimalAgeIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={AnimalAgeImage.src} {...props} ref={ref} />
  ),
);

AnimalAgeIcon.displayName = 'AnimalAgeIcon';
