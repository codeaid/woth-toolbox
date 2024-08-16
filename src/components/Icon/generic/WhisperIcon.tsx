import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import WhisperIconSvg from './assets/Whisper.svg';

export const WhisperIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={WhisperIconSvg} {...props} ref={ref} />
  ),
);

WhisperIcon.displayName = 'WhisperIcon';
