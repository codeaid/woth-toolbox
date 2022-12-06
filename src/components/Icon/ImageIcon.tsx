import { ForwardedRef, forwardRef } from 'react';
import { Icon } from './Icon';
import { ImageIconProps } from './types';

export const ImageIcon = forwardRef(
  (props: ImageIconProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { size, src, ...rest } = props;

    return (
      <Icon size={size} {...rest} ref={ref}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" draggable={false} height={size} src={src} width={size} />
      </Icon>
    );
  },
);

ImageIcon.displayName = 'ImageIcon';
