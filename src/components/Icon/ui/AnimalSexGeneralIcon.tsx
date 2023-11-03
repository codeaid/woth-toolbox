import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import type { IconProps } from '../types';
import AnimalSexGeneralImage from './assets/AnimalSexGeneral.png';

export const AnimalSexGeneralIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={AnimalSexGeneralImage.src} {...props} ref={ref} />
  ),
);

AnimalSexGeneralIcon.displayName = 'AnimalSexGeneralIcon';
