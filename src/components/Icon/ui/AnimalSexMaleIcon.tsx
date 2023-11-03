import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import type { IconProps } from '../types';
import AnimalSexMaleImage from './assets/AnimalSexMale.png';

export const AnimalSexMaleIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={AnimalSexMaleImage.src} {...props} ref={ref} />
  ),
);

AnimalSexMaleIcon.displayName = 'AnimalSexMaleIcon';
